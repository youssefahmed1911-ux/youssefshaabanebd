// This becomes step2/okay.js. Once it runs successfully, it creates the assignment folder.
"use strict";

const fs = require("fs");
const path = require("path");

console.log("okay.");

const assignmentDir = path.join(__dirname, "..", "assignment");
fs.mkdirSync(assignmentDir, { recursive: true });
fs.copyFileSync(
  path.join(__dirname, "..", "lib", "steps", "generate.js"),
  path.join(assignmentDir, "generate.js")
);

console.log("Created assignment/generate.js");
console.log("");
console.log("Next: go back to the project's root folder, then run generate.js.");
