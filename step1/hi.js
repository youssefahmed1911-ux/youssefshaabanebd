// This becomes step1/hi.js. Once it runs successfully, it creates step2.
"use strict";

const fs = require("fs");
const path = require("path");

console.log("Hello! You made it to step1.");

const step2Dir = path.join(__dirname, "..", "step2");
fs.mkdirSync(step2Dir, { recursive: true });
fs.copyFileSync(
  path.join(__dirname, "..", "lib", "steps", "okay.js"),
  path.join(step2Dir, "okay.js")
);

console.log("Created step2/okay.js");
console.log("");
console.log("Next: go back to the project's root folder, then run okay.js.");
