// Preflight checks. Run this first: `node init.js`.
// If everything checks out, this creates step1/hi.js — your next step.
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function run(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

const checks = [];

function check(label, fn) {
  try {
    const detail = fn();
    checks.push({ label, ok: true, detail });
  } catch (err) {
    checks.push({ label, ok: false, fix: err.message });
  }
}

check("Node.js is installed", () => {
  const version = process.version; // e.g. "v20.11.0"
  const major = Number(version.slice(1).split(".")[0]);
  if (major < 18) {
    throw new Error(
      `found Node ${version}, but this course needs 18 or newer.\n` +
        "   Fix: install the current LTS from https://nodejs.org and reopen your terminal."
    );
  }
  return version;
});

check("git is installed", () => {
  return run("git --version");
});

check('git config "user.name" is set', () => {
  try {
    return run("git config user.name");
  } catch {
    throw new Error(
      '   Fix: git config --global user.name "Your Name"'
    );
  }
});

check('git config "user.email" is set', () => {
  try {
    return run("git config user.email");
  } catch {
    throw new Error(
      '   Fix: git config --global user.email "your.email@student.giu-uni.de"'
    );
  }
});

check("this folder has a git remote (you cloned it)", () => {
  try {
    return run("git remote get-url origin");
  } catch {
    throw new Error(
      "   No git remote found. This usually means the repo was downloaded as a\n" +
        '   ZIP instead of cloned. Fix: on GitHub, use the green "Code" button ->\n' +
        "   Clone, then use VS Code's Source Control tab -> Clone Repository."
    );
  }
});

console.log("Environment check");
console.log("==================");

let allOk = true;
for (const c of checks) {
  if (c.ok) {
    console.log(`[OK]   ${c.label}  (${c.detail})`);
  } else {
    allOk = false;
    console.log(`[FAIL] ${c.label}`);
    console.log(c.fix);
  }
}

console.log("==================");

if (!allOk) {
  console.log("Fix the [FAIL] items above, then run `node init.js` again.");
  process.exit(1);
}

console.log("Everything looks good.");

const step1Dir = path.join(__dirname, "step1");
fs.mkdirSync(step1Dir, { recursive: true });
fs.copyFileSync(
  path.join(__dirname, "lib", "steps", "hi.js"),
  path.join(step1Dir, "hi.js")
);

console.log("");
console.log("Created step1/hi.js");
console.log("");
console.log("Next: run hi.js");
