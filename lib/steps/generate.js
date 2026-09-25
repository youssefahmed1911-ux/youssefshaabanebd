// Interactive. Run with: node generate.js
//
// Asks a few questions for flavor, then looks at *who owns this GitHub repo*
// (the git remote, not anything you typed) to deterministically generate your
// personal trial. Writes assignment/question.md.
"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { getRemoteUrl, parseOwner, seedFromOwner } = require("../lib/seed.js");

const PLACES = [
  "the Nile", "the Giza plateau", "Alexandria", "the Sinai dunes",
  "the Delta marshes", "the Red Sea coast", "Luxor's temples", "Siwa oasis",
];
const MONSTERS = [
  "Dragon", "Stone Golem", "Sphinx Wraith", "Basilisk",
  "Chimera", "Griffin", "Sand Kraken", "Ash Phoenix",
];
const VERBS = [
  "falls", "yields", "kneels", "shatters",
  "flees", "burns out", "crumbles", "surrenders",
];
const CLASSES = { "1": "Warrior", "2": "Mage", "3": "Rogue" };

function deriveTrial(seed) {
  const place = PLACES[seed % PLACES.length];
  const monster = MONSTERS[Math.floor(seed / 8) % MONSTERS.length];
  const verb = VERBS[Math.floor(seed / 64) % VERBS.length];
  const multiplier = 2 + (Math.floor(seed / 512) % 8); // 2..9
  const hp = 400 + (seed % 601); // flavor only, never checked
  const warcry = `By ${place}, the ${monster} ${verb}!`;
  return { place, monster, verb, multiplier, hp, warcry };
}

// Deliberately plain nested callbacks, not async/await: with piped stdin
// (e.g. a grader or CI feeding answers via `printf ... | node generate.js`),
// Node can emit stdin's 'close' the moment the last line is queued. If a
// question is re-issued from inside an `await`-resumed microtask, it loses
// the race against that close and the process exits mid-prompt. A callback
// fired synchronously from the previous 'line' event never crosses that gap.
function ask(rl, prompt, validate, callback) {
  rl.question(prompt, (raw) => {
    const answer = raw.trim();
    const error = validate ? validate(answer) : null;
    if (error) {
      console.log(`  ${error}`);
      ask(rl, prompt, validate, callback);
    } else {
      callback(answer);
    }
  });
}

function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("");
  console.log("=========================================");
  console.log("  A trial awaits. Answer the door below.");
  console.log("=========================================");
  console.log("");

  ask(
    rl,
    "Your name, adventurer? > ",
    (v) => (v.length === 0 ? "Can't adventure with no name." : null),
    (name) => {
      ask(
        rl,
        "Your student ID? > ",
        (v) => (!/^\d+$/.test(v) ? "Student IDs are digits only." : null),
        (studentId) => {
          console.log("");
          console.log("Choose your class:");
          console.log("  [1] Warrior   [2] Mage   [3] Rogue");
          ask(
            rl,
            "> ",
            (v) => (!CLASSES[v] ? "Pick 1, 2, or 3." : null),
            (classChoice) => {
              rl.close();
              finish(name, studentId, CLASSES[classChoice]);
            }
          );
        }
      );
    }
  );
}

function finish(name, studentId, className) {
  let owner;
  try {
    owner = parseOwner(getRemoteUrl());
  } catch (err) {
    console.log("");
    console.log("Could not find a GitHub owner for this repo's remote.");
    console.log(`(${err.message})`);
    console.log("");
    console.log("This usually means you're not in a proper clone. Fix:");
    console.log("  - Make sure you used 'Use this template' on GitHub, then");
    console.log("    cloned YOUR repo (not downloaded a ZIP).");
    console.log("  - Run: node ../init.js   to double-check your setup.");
    process.exit(1);
  }

  const seed = seedFromOwner(owner);
  const trial = deriveTrial(seed);

  console.log("");
  console.log(`A wild ${trial.monster} blocks your path near ${trial.place}.`);
  console.log(`${trial.monster} HP: ${trial.hp}`);
  console.log("Your weapon hums with sealed power...");
  console.log("");

  const outPath = path.join(__dirname, "question.md");
  const alreadyExisted = fs.existsSync(outPath);

  const sampleId = "11111111";
  const sampleLine = String(Number(sampleId) * trial.multiplier);

  const content = `# Quest Log

Hero: ${name} the ${className}
Student ID: ${studentId}
GitHub account: ${owner}

A **${trial.monster}** bars the way near **${trial.place}**. It only falls to
the exact blow.

## Your trial

Create \`solution.js\` in this same folder (\`assignment/\`). When run with
\`node solution.js\`, it must print exactly four lines, in this order:

1. Your hero name
2. Your student ID
3. Your power — your student ID **multiplied by ${trial.multiplier}**
4. Your warcry — copy the line below exactly, including punctuation:

   "${trial.warcry}"

### Worked example (not your answer — this uses a placeholder ID)

If your student ID were \`${sampleId}\` (it isn't), line 3 would be:

\`\`\`
${sampleLine}
\`\`\`

Use your *real* student ID above, not the placeholder.

## Next steps

1. Write \`solution.js\` in this folder.
2. Run \`node solution.js\` and check the four lines look right.
3. Commit **this file** (\`question.md\`) using VS Code's Source Control tab
   (stage, message, commit, Sync) — this is proof you ran \`generate.js\` in
   your own clone.
4. Commit \`solution.js\` from the **terminal** (\`git add\`, \`git commit\`,
   \`git push\`).
5. Push, then submit your repo link to the form.
`;

  fs.writeFileSync(outPath, content, "utf8");

  console.log(alreadyExisted ? "question.md regenerated." : "question.md written.");
  console.log("");
  console.log("Next: write assignment/solution.js, then run:");
  console.log("  node solution.js");
}

main();
