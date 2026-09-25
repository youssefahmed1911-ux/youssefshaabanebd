// Shared by generate.js: turn "whoever owns this GitHub repo" into a
// deterministic seed. Seeded on the owner, not the repo name, because
// students name their own repos but can't change their GitHub account
// without breaking the remote they just cloned.
"use strict";

const { execSync } = require("child_process");

function getRemoteUrl() {
  return execSync("git remote get-url origin", {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

// Accepts:
//   git@github.com:OWNER/repo.git
//   https://github.com/OWNER/repo.git
//   https://github.com/OWNER/repo
function parseOwner(remoteUrl) {
  const match = remoteUrl.match(/github\.com[:/]([^/]+)\/[^/]+?(?:\.git)?\/?$/i);
  if (!match) {
    throw new Error(`could not find a GitHub owner in remote URL: ${remoteUrl}`);
  }
  return match[1].toLowerCase();
}

// FNV-1a, 32-bit. Small, dependency-free, and stable across Node versions —
// the grader has to reproduce this exact number from just a username.
function hashToSeed(text) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function seedFromOwner(owner) {
  return hashToSeed(owner.trim().toLowerCase());
}

module.exports = { getRemoteUrl, parseOwner, hashToSeed, seedFromOwner };
