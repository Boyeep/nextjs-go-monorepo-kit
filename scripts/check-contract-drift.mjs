import { spawnSync } from "node:child_process";
import process from "node:process";

const commands = [
  {
    command: "npm",
    args: ["run", "api:types"],
  },
  {
    command: "git",
    args: ["diff", "--exit-code", "--", "frontend/src/generated/openapi.ts"],
  },
];

for (const item of commands) {
  const result = spawnSync(item.command, item.args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    if (item.command === "git") {
      console.error(
        "Generated API types are out of date. Run `npm run api:types` and commit the updated file.",
      );
    }

    process.exit(result.status ?? 1);
  }
}
