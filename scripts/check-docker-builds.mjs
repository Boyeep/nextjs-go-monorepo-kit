import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const builds = [
  {
    args: [
      "build",
      "--target",
      "runner",
      "--tag",
      "nextjs-go-monorepo-kit-backend:ci",
      path.join(root, "backend"),
    ],
  },
  {
    args: [
      "build",
      "--target",
      "runner",
      "--tag",
      "nextjs-go-monorepo-kit-frontend:ci",
      path.join(root, "frontend"),
    ],
  },
];

for (const build of builds) {
  const result = spawnSync("docker", build.args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
