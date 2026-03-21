import { spawnSync } from "node:child_process";
import process from "node:process";

const ACTIONLINT_VERSION = process.env.ACTIONLINT_VERSION ?? "v1.7.11";
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
    "Go is required to run workflow lint locally. Install Go or rely on the CI workflow-lint job.",
  );

  if (details) {
    console.error(details);
  }

  process.exit(goVersion.status ?? 1);
}

const args = [
  "run",
  `github.com/rhysd/actionlint/cmd/actionlint@${ACTIONLINT_VERSION}`,
  "-shellcheck=",
  "-pyflakes=",
  ...process.argv.slice(2),
];

const result = run("go", args);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
