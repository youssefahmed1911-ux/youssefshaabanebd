# Assignment 1 — Environment Setup and Development Basics

EBD (BINF 503), Winter 2026. About 2 hours.

By the end you will have VS Code, Git, and Node.js installed. You will make
your first commit and your first push.

Slides that walk through all of this step by step:
[assignment-01.pdf](assignment-01.pdf).

## 1. Setup

Install these, in order:

1. **VS Code** — <https://code.visualstudio.com/>
2. **Git** — <https://git-scm.com/downloads> (Windows: this also installs Git Bash)
3. **Node.js**, the **LTS** version — <https://nodejs.org/>

**Windows:** close and reopen VS Code (and any terminal) after installing.
It won't see `node` until you do.

Now open a terminal:

1. Open VS Code.
2. Click **Terminal** in the top menu bar.
3. Click **New Terminal**.

A panel opens at the bottom of the window — that's the terminal. Click
inside it, type, then press **Enter** to run a command.

**Commands** (like the ones below) go in the terminal. **Code and text**
(like `solution.js`, later) go in a file, written in the editor — never
typed into the terminal. ("Terminal," "shell," "command line," "CLI" all
mean the same thing, just different names people use for it.)

To see your files: look at the **Explorer** sidebar (the file list on the
left), or type `ls` (Mac/Linux/Git Bash) or `dir` (Windows) in the terminal.

Check both tools installed:

```bash
git --version
node -v
```

You should see a version number for each. If not, restart your terminal.

Now set your git identity. **Do this once — without it, your first commit will fail:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@student.giu-uni.de"
```

Then make a **GitHub account** if you don't have one: <https://github.com/>

## 2. Get the repo

1. On the assignment's GitHub page, click **Use this template → Create a new
   repository**. Pick any name. Keep it on **your own GitHub account**.
2. Clone **your** new repo and open it in VS Code:
   - Open VS Code.
   - Click the **Source Control** icon in the left sidebar.
   - Click **Clone Repository**, paste your repo's URL, and pick a folder.
   - Use this button, not the terminal — you'll use this same tab again soon.

### Opening the folder again later

You'll need to do this every time you come back to this project.

**Start from VS Code:**
1. Open VS Code (Windows: search "VS Code" in the Start Menu. Mac: use
   Spotlight, or find it in Launchpad).
2. Click **File → Open Folder...** (or **Open Folder** on the Welcome screen).
3. Find your repo folder, select it, then click **Select Folder** (Windows)
   or **Open** (Mac).

**Or start from your files:**
1. Open your file manager (File Explorer on Windows, Finder on Mac).
2. Find your repo folder.
3. Right-click it → **Open with Code** (if you see that option), or just
   drag the folder onto an open VS Code window.

## 3. Work through it, from the terminal

Everything from here happens in a terminal, inside your project folder.
Open one: **Terminal → New Terminal** — since your project is open in
VS Code, it starts right there.

This folder only has one file to run right now: `init.js`. Start there:

```bash
node init.js
```

It checks that everything is set up right. If something is wrong, it tells
you how to fix it. If everything is good, it creates `step1/hi.js` — a new
file that wasn't there before.

### Step 1

Run this:

```bash
node hi.js
```

**It will fail**, with a big red error. Look for this line in it:

```
Error: Cannot find module '/.../hi.js'
```

Node looked for `hi.js` right where you are, and it's not there — it's
inside `step1/`. Two ways to fix it:

```bash
cd step1
node hi.js
```

or, without moving, give the full path instead:

```bash
node step1/hi.js
```

Either way works. Once it runs, it creates `step2/okay.js`.

### Step 2

Get back to the project's root folder (tip: **Terminal → New Terminal** in
VS Code always opens a fresh one there), then:

```bash
cd step2
node okay.js
```

Once it runs, it creates `assignment/generate.js`.

### The assignment

Back to the root folder again, then:

```bash
cd assignment
node generate.js
```

It asks you a few questions, then makes a small challenge just for you.
It writes `question.md` in this folder — **read it**, it tells you exactly
what to do.

Then:

1. Create `solution.js` in the `assignment/` folder: right-click
   **assignment** in the Explorer sidebar → **New File** → type the name
   → Enter. Write your code in the editor, not the terminal. Make it
   print what `question.md` asks, in the same order.
2. Check it:
   ```bash
   node solution.js
   ```
3. Commit and push (see below).

## 4. Commit twice, two different ways

You will commit **two times**, in two different ways:

1. **Commit `question.md` through VS Code's Source Control tab.** Stage it,
   write a message, click the checkmark to commit, then click **Sync
   Changes** to push.
2. **Commit `solution.js` from the terminal:**
   ```bash
   git add assignment/solution.js
   git commit -m "Add solution"
   git push
   ```

Both do the same thing. The Source Control tab is just buttons for
`git add` / `git commit` / `git push`.

## 5. Submit

Fill in the submission form: <https://forms.gle/1f44aaXxVKVtTfgZ8>

With:

- Your name
- Your student ID
- Your GitHub username
- Your repo's URL

Push **before** you submit. We only check what's on GitHub.

## Troubleshooting

- **VS Code opens but your project isn't there:** see "Opening the folder
  again later" in step 2.
- **Don't see a terminal:** click **Terminal → New Terminal** in the top
  menu.
- **`git` or `node` says "not found":** close and reopen your terminal.
- **Windows: `ls` doesn't work.** Use Git Bash, or type `dir` instead.
- **`Cannot find module`:** Node can't find the file where you are. Either
  `cd` into the right folder, or type the full path to the file.
- **`init.js` or `generate.js` shows a git error:** you may have
  downloaded a ZIP instead of cloning. Go back to step 2.
- **A step's file is missing:** each step is created by the one before it.
  Run `init.js`, then `hi.js`, then `okay.js`, in that order.
