import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const commands = [
  { cwd: path.join(process.cwd(), "frontend"), command: "npm", args: ["run", "lint:strict"] },
  { cwd: path.join(process.cwd(), "frontend"), command: "npm", args: ["run", "format:check"] },
  { cwd: path.join(process.cwd(), "frontend"), command: "npm", args: ["run", "typecheck"] },
  { cwd: path.join(process.cwd(), "frontend"), command: "npm", args: ["run", "test"] },
  { cwd: path.join(process.cwd(), "frontend"), command: "npm", args: ["run", "build"] },
  { cwd: path.join(process.cwd(), "backend"), command: "go", args: ["test", "./..."] },
  { cwd: path.join(process.cwd(), "backend"), command: "go", args: ["build", "./..."] },
];

for (const item of commands) {
  const result = spawnSync(item.command, item.args, {
    cwd: item.cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
