// scripts/reset-project.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

// Helper to run shell commands
function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

// 1. Delete node_modules in root
const rootNodeModules = path.join(root, "node_modules");
if (fs.existsSync(rootNodeModules)) {
  console.log("Removing root node_modules...");
  fs.rmSync(rootNodeModules, { recursive: true, force: true });
}

// 2. Delete node_modules in each workspace
const workspaces = ["packages/backend", "packages/client/web", "packages/client/mobile", "packages/shared"];
for (const ws of workspaces) {
  const wsNodeModules = path.join(root, ws, "node_modules");
  if (fs.existsSync(wsNodeModules)) {
    console.log(`Removing node_modules in ${ws}...`);
    fs.rmSync(wsNodeModules, { recursive: true, force: true });
  }
}

// 3. Clear logs or temp files
const storage = path.join(root, "storage");
if (fs.existsSync(storage)) {
  console.log("Clearing storage folder...");
  fs.rmSync(storage, { recursive: true, force: true });
}

// 4. Reinstall dependencies
console.log("Reinstalling dependencies...");
run("npm install");

console.log("\n Project reset complete!");
