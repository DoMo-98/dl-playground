#!/usr/bin/env node

const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID;
const teamId = process.env.VERCEL_TEAM_ID || "";
const githubRepository = process.env.GITHUB_REPOSITORY || "";
const githubToken = process.env.GITHUB_TOKEN || "";
const dryRun = String(process.env.DRY_RUN || "false").toLowerCase() === "true";
const apiBaseUrl = "https://api.vercel.com";
const githubApiBaseUrl = "https://api.github.com";

if (!token) {
  throw new Error("Missing VERCEL_TOKEN environment variable.");
}

if (!projectId) {
  throw new Error("Missing VERCEL_PROJECT_ID environment variable.");
}

if (!githubRepository || !githubRepository.includes("/")) {
  throw new Error("Missing or invalid GITHUB_REPOSITORY environment variable.");
}

if (!githubToken) {
  throw new Error("Missing GITHUB_TOKEN environment variable.");
}

const [owner, repo] = githubRepository.split("/");

function looksLikeCommitSha(value) {
  return /^[0-9a-f]{40}$/i.test(String(value || "").trim());
}

function normalizeBranch(value) {
  const branch = String(value || "").trim();

  if (!branch || looksLikeCommitSha(branch)) {
    return "";
  }

  return branch.replace(/^refs\/heads\//, "");
}

function branchFromDeployment(deployment) {
  const candidates = [
    deployment?.meta?.githubCommitRef,
    deployment?.meta?.githubCommitBranch,
    deployment?.gitSource?.ref,
    deployment?.gitSource?.branch,
    deployment?.source,
  ];

  for (const candidate of candidates) {
    const branch = normalizeBranch(candidate);
    if (branch) {
      return branch;
    }
  }

  return "";
}

function formatDeployment(deployment, branch) {
  const createdAt = deployment?.created ? new Date(deployment.created).toISOString() : "unknown-date";
  return `${deployment.uid} | ${deployment.readyState || "unknown-state"} | ${createdAt} | ${deployment.url || "no-url"} | branch=${branch || "unknown"}`;
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

async function githubFetch(path) {
  const headers = new Headers({
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  });

  const response = await fetch(`${githubApiBaseUrl}${path}`, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status} for ${path}: ${body}`);
  }

  return response.json();
}

async function listPreviewDeployments() {
  const deployments = [];
  let until;

  while (deployments.length < 500) {
    const pageParams = new URLSearchParams({
      projectId,
      target: "preview",
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

async function listRemoteBranches() {
  const branches = new Set();
  let page = 1;

  while (true) {
    const payload = await githubFetch(`/repos/${owner}/${repo}/branches?per_page=100&page=${page}`);

    if (!Array.isArray(payload) || payload.length === 0) {
      break;
    }

    for (const branch of payload) {
      if (branch?.name) {
        branches.add(branch.name);
      }
    }

    if (payload.length < 100) {
      break;
    }

    page += 1;
  }

  return branches;
}

async function deleteDeployment(deploymentId) {
  const query = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
  return vercelFetch(`/v13/deployments/${deploymentId}${query}`, {
    method: "DELETE",
  });
}

const protectedBranches = new Set(["main", "master"]);
const previewDeployments = (await listPreviewDeployments()).sort((a, b) => b.created - a.created);

console.log(`Found ${previewDeployments.length} active preview deployment(s) to inspect.`);

if (previewDeployments.length === 0) {
  process.exit(0);
}

const remoteBranches = await listRemoteBranches();
console.log(`Loaded ${remoteBranches.size} branch name(s) from GitHub.`);

const branchesToDelete = new Map();
let skippedWithoutBranch = 0;
let skippedProtected = 0;
let keptExistingBranch = 0;

for (const deployment of previewDeployments) {
  const branch = branchFromDeployment(deployment);

  if (!branch) {
    skippedWithoutBranch += 1;
    console.log(`Skipping deployment with ambiguous branch metadata: ${formatDeployment(deployment, branch)}`);
    continue;
  }

  if (protectedBranches.has(branch)) {
    skippedProtected += 1;
    continue;
  }

  if (remoteBranches.has(branch)) {
    keptExistingBranch += 1;
    continue;
  }

  const currentDeployments = branchesToDelete.get(branch) || [];
  currentDeployments.push(deployment);
  branchesToDelete.set(branch, currentDeployments);
}

console.log(`Skipped ${skippedWithoutBranch} deployment(s) with no trustworthy branch metadata.`);
console.log(`Skipped ${skippedProtected} deployment(s) on protected branches.`);
console.log(`Kept ${keptExistingBranch} deployment(s) for branches that still exist on GitHub.`);

if (branchesToDelete.size === 0) {
  console.log("No dead-branch preview deployments found.");
  process.exit(0);
}

let deletions = 0;

for (const [branch, deployments] of [...branchesToDelete.entries()].sort(([left], [right]) => left.localeCompare(right))) {
  console.log(`Dead branch detected: ${branch} (${deployments.length} preview deployment(s))`);

  for (const deployment of deployments.sort((a, b) => b.created - a.created)) {
    if (deployment.target && deployment.target !== "preview") {
      console.log(`Skipping non-preview deployment defensively: ${formatDeployment(deployment, branch)}`);
      continue;
    }

    if (dryRun) {
      console.log(`[dry-run] Would delete ${formatDeployment(deployment, branch)}`);
      deletions += 1;
      continue;
    }

    console.log(`Deleting ${formatDeployment(deployment, branch)}`);
    await deleteDeployment(deployment.uid);
    deletions += 1;
  }
}

console.log(`Dead-branch cleanup complete. ${dryRun ? "Planned" : "Deleted"} ${deletions} preview deployment(s) across ${branchesToDelete.size} branch(es).`);
