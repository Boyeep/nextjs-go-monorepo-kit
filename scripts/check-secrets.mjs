import { spawnSync } from "node:child_process";
import process from "node:process";

const GITLEAKS_VERSION = process.env.GITLEAKS_VERSION ?? "v8.30.1";
const shell = process.platform === "win32";

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    stdio: options.capture ? "pipe" : "inherit",
    encoding: options.capture ? "utf8" : undefined,
    shell,
  });
}

const goVersion = run("go", ["version"], { capture: true });

if (goVersion.error || goVersion.status !== 0) {
  const details = [goVersion.stdout, goVersion.stderr].filter(Boolean).join("\n").trim();
  console.error(
    "Go is required to run secret scanning locally. Install Go or rely on the CI secret-scan job.",
  );

  if (details) {
    console.error(details);
  }

  process.exit(goVersion.status ?? 1);
}

const args = [
  "run",
  `github.com/zricethezav/gitleaks/v8@${GITLEAKS_VERSION}`,
  "git",
  "--no-banner",
  "--redact",
  ".",
  ...process.argv.slice(2),
];

const result = run("go", args);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
