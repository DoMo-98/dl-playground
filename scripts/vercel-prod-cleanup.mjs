#!/usr/bin/env node

const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID;
const teamId = process.env.VERCEL_TEAM_ID || "";
const currentDeploymentId = process.env.VERCEL_CURRENT_DEPLOYMENT_ID || "";
const currentDeploymentUrl = process.env.VERCEL_CURRENT_DEPLOYMENT_URL || "";
const retainCount = Math.max(1, Number.parseInt(process.env.VERCEL_PRODUCTION_RETAIN_COUNT || "10", 10) || 10);
const dryRun = String(process.env.DRY_RUN || "false").toLowerCase() === "true";
const apiBaseUrl = "https://api.vercel.com";

if (!token) {
  throw new Error("Missing VERCEL_TOKEN environment variable.");
}

if (!projectId) {
  throw new Error("Missing VERCEL_PROJECT_ID environment variable.");
}

function normalizeDeploymentUrl(value) {
  return String(value || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

function formatDeployment(deployment) {
  const createdAt = deployment?.created ? new Date(deployment.created).toISOString() : "unknown-date";
  return `${deployment.uid} | ${deployment.readyState || "unknown-state"} | ${deployment.target || "unknown-target"} | ${createdAt} | ${deployment.url || "no-url"}`;
}

function isClearlyProductionDeployment(deployment) {
  return deployment?.target === "production";
}

function isSameDeployment(left, right) {
  if (!left || !right) {
    return false;
  }

  const leftUrl = normalizeDeploymentUrl(left.url);
  const rightUrl = normalizeDeploymentUrl(right.url);

  return Boolean(
    (left.uid && right.uid && left.uid === right.uid) ||
      (left.id && right.id && left.id === right.id) ||
      (leftUrl && rightUrl && leftUrl === rightUrl),
  );
}

async function vercelFetch(path, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Vercel API ${response.status} for ${path}: ${body}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function listProductionDeployments() {
  const deployments = [];
  let until;

  while (deployments.length < 500) {
    const pageParams = new URLSearchParams({
      projectId,
      target: "production",
      limit: "100",
    });

    if (teamId) {
      pageParams.set("teamId", teamId);
    }

    if (until) {
      pageParams.set("until", String(until));
    }

    const payload = await vercelFetch(`/v6/deployments?${pageParams.toString()}`);
    const pageItems = payload.deployments || [];

    deployments.push(...pageItems);

    if (!payload.pagination?.next || pageItems.length === 0) {
      break;
    }

    until = payload.pagination.next;
  }

  return deployments.filter((deployment) => !deployment.deleted);
}

async function deleteDeployment(deploymentId) {
  const query = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
  return vercelFetch(`/v13/deployments/${deploymentId}${query}`, {
    method: "DELETE",
  });
}

const allProductionDeployments = (await listProductionDeployments()).sort((a, b) => b.created - a.created);
const productionDeployments = allProductionDeployments.filter(isClearlyProductionDeployment);
const ambiguousDeployments = allProductionDeployments.filter((deployment) => !isClearlyProductionDeployment(deployment));

console.log(`Found ${allProductionDeployments.length} deployment(s) returned by the production query.`);
console.log(`Clearly production deployments eligible for retention review: ${productionDeployments.length}.`);

if (ambiguousDeployments.length > 0) {
  console.log(`Skipping ${ambiguousDeployments.length} deployment(s) with ambiguous production metadata.`);
  for (const deployment of ambiguousDeployments) {
    console.log(`- ambiguous: ${formatDeployment(deployment)}`);
  }
}

if (productionDeployments.length === 0) {
  console.log("No clearly production deployments found. Skipping cleanup.");
  process.exit(0);
}

console.log("Clearly production deployments (newest first):");
for (const deployment of productionDeployments) {
  console.log(`- ${formatDeployment(deployment)}`);
}

const normalizedCurrentDeploymentUrl = normalizeDeploymentUrl(currentDeploymentUrl);
const currentDeployment = currentDeploymentId || normalizedCurrentDeploymentUrl
  ? productionDeployments.find(
      (deployment) =>
        deployment.uid === currentDeploymentId ||
        deployment.id === currentDeploymentId ||
        normalizeDeploymentUrl(deployment.url) === normalizedCurrentDeploymentUrl,
    ) || null
  : null;

if (!currentDeployment) {
  console.log(
    "Could not safely determine the current production deployment from VERCEL_CURRENT_DEPLOYMENT_ID/URL. Skipping cleanup.",
  );
  process.exit(0);
}

console.log(`Preserving active production deployment: ${formatDeployment(currentDeployment)}`);
console.log(`Retention target: keep ${retainCount} production deployment(s) total, including the active deployment.`);

const keep = [];
const keepIds = new Set();

function addToKeep(deployment) {
  if (!deployment || keepIds.has(deployment.uid)) {
    return;
  }

  keep.push(deployment);
  keepIds.add(deployment.uid);
}

addToKeep(currentDeployment);

for (const deployment of productionDeployments) {
  if (keep.length >= retainCount) {
    break;
  }

  addToKeep(deployment);
}

const remove = productionDeployments.filter((deployment) => !keepIds.has(deployment.uid));

console.log("Deployments kept:");
for (const deployment of keep) {
  console.log(`- keep: ${formatDeployment(deployment)}`);
}

if (remove.length === 0) {
  console.log("Nothing to delete. Retention window already satisfied.");
  process.exit(0);
}

console.log("Older production deployments selected for deletion:");
for (const deployment of remove) {
  console.log(`- delete: ${formatDeployment(deployment)}`);
}

for (const deployment of remove) {
  if (!isClearlyProductionDeployment(deployment)) {
    console.log(`Skipping defensively because deployment is not clearly production: ${formatDeployment(deployment)}`);
    continue;
  }

  if (isSameDeployment(deployment, currentDeployment)) {
    console.log(`Skipping defensively because deployment matches the active production deployment: ${formatDeployment(deployment)}`);
    continue;
  }

  if (dryRun) {
    console.log(`[dry-run] Would delete ${formatDeployment(deployment)}`);
    continue;
  }

  console.log(`Deleting ${formatDeployment(deployment)}`);
  await deleteDeployment(deployment.uid);
}

console.log(`Production cleanup complete. ${dryRun ? "Planned" : "Deleted"} ${remove.length} older production deployment(s).`);
