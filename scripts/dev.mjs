import { copyFileSync, existsSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

function ensureFile(targetPath, examplePath) {
  if (!existsSync(targetPath) && existsSync(examplePath)) {
    copyFileSync(examplePath, targetPath);
    console.log(`Created ${path.relative(root, targetPath)} from example`);
  }
}

function run(command, args, options = {}) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`${command} exited with code ${code}`);
    }
  });

  return child;
}

ensureFile(path.join(root, "frontend", ".env.local"), path.join(root, "frontend", ".env.example"));
ensureFile(path.join(root, "backend", ".env"), path.join(root, "backend", ".env.example"));

console.log("Starting Postgres via Docker Compose...");
const compose = spawnSync("docker", ["compose", "up", "-d", "postgres"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (compose.status !== 0) {
  process.exit(compose.status ?? 1);
}

console.log("Starting Next.js Go Monorepo Kit frontend and backend...");
const frontend = run("npm", ["run", "dev"], { cwd: path.join(root, "frontend") });
const backend = run("go", ["run", "./cmd/api"], { cwd: path.join(root, "backend") });

function shutdown() {
  frontend.kill("SIGINT");
  backend.kill("SIGINT");
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
