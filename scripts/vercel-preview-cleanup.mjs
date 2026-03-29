#!/usr/bin/env node

const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID;
const teamId = process.env.VERCEL_TEAM_ID || "";
const inputBranch = process.env.VERCEL_GIT_BRANCH || process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || "";
const currentDeploymentId = process.env.VERCEL_CURRENT_DEPLOYMENT_ID || "";
const currentDeploymentUrl = process.env.VERCEL_CURRENT_DEPLOYMENT_URL || "";
const dryRun = String(process.env.DRY_RUN || "false").toLowerCase() === "true";
const apiBaseUrl = "https://api.vercel.com";

if (!token) {
  throw new Error("Missing VERCEL_TOKEN environment variable.");
}

if (!projectId) {
  throw new Error("Missing VERCEL_PROJECT_ID environment variable.");
}

function looksLikeCommitSha(value) {
  return /^[0-9a-f]{40}$/i.test(value);
}

function pickBranchCandidate(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim() && !looksLikeCommitSha(value.trim())) {
      return value.trim();
    }
  }

  return "";
}

function normalizeDeploymentUrl(value) {
  return String(value || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

async function getDeployment(deploymentId) {
  if (!deploymentId) {
    return null;
  }

  const query = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
  return vercelFetch(`/v13/deployments/${deploymentId}${query}`);
}

async function findDeploymentByUrl(deploymentUrl) {
  const normalizedUrl = normalizeDeploymentUrl(deploymentUrl);

  if (!normalizedUrl) {
    return null;
  }

  const pageParams = new URLSearchParams({
    projectId,
    target: "preview",
    limit: "100",
  });

  if (teamId) {
    pageParams.set("teamId", teamId);
  }

  const payload = await vercelFetch(`/v6/deployments?${pageParams.toString()}`);
  const pageItems = payload.deployments || [];

  return pageItems.find((deployment) => normalizeDeploymentUrl(deployment.url) === normalizedUrl) || null;
}

function branchFromDeployment(deployment) {
  return pickBranchCandidate(
    deployment?.meta?.githubCommitRef,
    deployment?.meta?.githubCommitBranch,
    deployment?.gitSource?.ref,
    deployment?.gitSource?.branch,
    deployment?.source,
  );
}

async function resolveBranch() {
  if (inputBranch && !looksLikeCommitSha(inputBranch)) {
    return inputBranch;
  }

  if (inputBranch) {
    console.log(`Input branch \"${inputBranch}\" looks like a commit SHA. Attempting to recover the real branch from Vercel deployment metadata.`);
  }

  if (currentDeploymentUrl) {
    const deploymentFromUrl = await findDeploymentByUrl(currentDeploymentUrl);
    const resolvedFromUrl = branchFromDeployment(deploymentFromUrl);

    if (resolvedFromUrl) {
      console.log(`Resolved branch \"${resolvedFromUrl}\" from deployment URL ${currentDeploymentUrl}.`);
      return resolvedFromUrl;
    }

    console.log(`Could not recover a branch name from deployment URL ${currentDeploymentUrl}.`);
  }

  if (currentDeploymentId) {
    try {
      const deployment = await getDeployment(currentDeploymentId);
      const resolvedBranch = branchFromDeployment(deployment);

      if (resolvedBranch) {
        console.log(`Resolved branch \"${resolvedBranch}\" from deployment ${currentDeploymentId}.`);
        return resolvedBranch;
      }

      console.log(`Could not recover a branch name from deployment ${currentDeploymentId}.`);
    } catch (error) {
      console.log(`Deployment lookup by id ${currentDeploymentId} failed: ${error.message}`);
    }
  }

  console.log(`Falling back to input value \"${inputBranch}\".`);
  return inputBranch;
}

const branch = await resolveBranch();

if (!branch) {
  console.log("No branch detected. Skipping cleanup.");
  process.exit(0);
}

if (["main", "master"].includes(branch)) {
  console.log(`Branch ${branch} is protected from preview cleanup. Skipping.`);
  process.exit(0);
}

const searchParams = new URLSearchParams({
  projectId,
  target: "preview",
  branch,
  limit: "100",
});

if (teamId) {
  searchParams.set("teamId", teamId);
}

function formatDeployment(deployment) {
  const createdAt = new Date(deployment.created).toISOString();
  return `${deployment.uid} | ${deployment.readyState} | ${createdAt} | ${deployment.url || "no-url"}`;
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

async function listDeployments() {
  const deployments = [];
  let until;

  while (deployments.length < 500) {
    const pageParams = new URLSearchParams(searchParams);
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

  return deployments;
}

async function deleteDeployment(deploymentId) {
  const query = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
  return vercelFetch(`/v13/deployments/${deploymentId}${query}`, {
    method: "DELETE",
  });
}

const deployments = (await listDeployments())
  .filter((deployment) => !deployment.deleted)
  .sort((a, b) => b.created - a.created);

console.log(`Found ${deployments.length} active preview deployment(s) for branch ${branch}.`);

if (deployments.length === 0) {
  process.exit(0);
}

const readyDeployments = deployments.filter((deployment) => deployment.readyState === "READY");
const nonReadyDeployments = deployments.filter((deployment) => deployment.readyState !== "READY");

console.log("Ready deployments:");
for (const deployment of readyDeployments) {
  console.log(`- ${formatDeployment(deployment)}`);
}

if (nonReadyDeployments.length > 0) {
  console.log("Non-ready deployments:");
  for (const deployment of nonReadyDeployments) {
    console.log(`- ${formatDeployment(deployment)}`);
  }
}

const normalizedCurrentDeploymentUrl = normalizeDeploymentUrl(currentDeploymentUrl);

function isSameDeployment(left, right) {
  if (!left || !right) {
    return false;
  }

  const sameUid = left.uid && right.uid && left.uid === right.uid;
  const sameId = left.id && right.id && left.id === right.id;
  const sameUrl = normalizeDeploymentUrl(left.url) && normalizeDeploymentUrl(right.url)
    && normalizeDeploymentUrl(left.url) === normalizeDeploymentUrl(right.url);

  return sameUid || sameId || sameUrl;
}

const explicitlyMatchedDeployment = currentDeploymentId || normalizedCurrentDeploymentUrl
  ? deployments.find(
      (deployment) =>
        deployment.uid === currentDeploymentId ||
        deployment.id === currentDeploymentId ||
        normalizeDeploymentUrl(deployment.url) === normalizedCurrentDeploymentUrl,
    ) || null
  : null;

// Conservative Option B policy:
// - preserve the matched triggering deployment whenever it can be identified
// - otherwise preserve the newest useful READY deployment
// - only delete stale non-READY deployments when a useful READY deployment remains preserved
const keep = explicitlyMatchedDeployment || readyDeployments[0] || null;
const keepIsUseful = keep?.readyState === "READY";

if (currentDeploymentId || currentDeploymentUrl) {
  console.log(
    `Triggered by deployment context id=${currentDeploymentId || "n/a"} url=${currentDeploymentUrl || "n/a"}. Preserving that deployment explicitly when matched.`,
  );
}

if (!keep) {
  console.log("No deployment could be selected safely for preservation. Skipping cleanup.");
  process.exit(0);
}

console.log(`Keeping deployment: ${formatDeployment(keep)}`);

const remove = deployments.filter((deployment) => {
  if (isSameDeployment(deployment, keep)) {
    return false;
  }

  if (deployment.readyState === "READY") {
    return true;
  }

  return keepIsUseful;
});

if (!keepIsUseful && nonReadyDeployments.length > 0) {
  console.log("No useful READY deployment was preserved, so non-ready deployments will be kept for safety.");
}

if (remove.length === 0) {
  console.log("Nothing else to delete.");
  process.exit(0);
}

for (const deployment of remove) {
  if (dryRun) {
    console.log(`[dry-run] Would delete ${formatDeployment(deployment)}`);
    continue;
  }

  console.log(`Deleting ${formatDeployment(deployment)}`);
  await deleteDeployment(deployment.uid);
}

console.log(`Cleanup complete. Deleted ${remove.length} old preview deployment(s).`);
