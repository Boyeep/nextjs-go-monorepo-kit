import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const frontendDir = path.join(root, "frontend");
const backendDir = path.join(root, "backend");
const reportDir = path.join(root, "reports", "licenses");
const npmLicenseTool = "license-checker-rseidelsohn@4.4.2";
const goLicensesVersion = "v2.0.1";

function runAndCapture(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: "pipe",
    shell: process.platform === "win32",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(
      details
        ? `Command failed: ${command} ${args.join(" ")}\n${details}`
        : `Command failed: ${command} ${args.join(" ")}`,
    );
  }

  return {
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

function writeReport(filename, content) {
  const outputPath = path.join(reportDir, filename);
  const normalized = content.endsWith("\n") ? content : `${content}\n`;
  writeFileSync(outputPath, normalized, "utf8");
}

function summarizeNpmLicenses(rawJson) {
  const data = JSON.parse(rawJson);
  const counts = new Map();

  for (const item of Object.values(data)) {
    const license = item.licenses ?? "UNKNOWN";
    counts.set(license, (counts.get(license) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) {
        return right[1] - left[1];
      }

      return left[0].localeCompare(right[0]);
    })
    .map(([license, count]) => `${count.toString().padStart(3, " ")}  ${license}`)
    .join("\n");
}

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === "\"") {
      if (inQuotes && line[index + 1] === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      fields.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  fields.push(current);
  return fields;
}

function summarizeGoLicenses(rawCsv) {
  const counts = new Map();

  for (const line of rawCsv.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const fields = parseCsvLine(trimmed);
    const license = fields.at(-1) || "UNKNOWN";
    counts.set(license, (counts.get(license) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((left, right) => {
      if (right[1] !== left[1]) {
        return right[1] - left[1];
      }

      return left[0].localeCompare(right[0]);
    })
    .map(([license, count]) => `${count.toString().padStart(3, " ")}  ${license}`)
    .join("\n");
}

rmSync(reportDir, { recursive: true, force: true });
mkdirSync(reportDir, { recursive: true });

const rootNpm = runAndCapture(
  "npx",
  [
    "--yes",
    npmLicenseTool,
    "--json",
    "--excludePrivatePackages",
    "--relativeLicensePath",
    "--relativeModulePath",
  ],
  root,
);

writeReport("root-npm.json", rootNpm.stdout);
writeReport("root-npm-summary.txt", summarizeNpmLicenses(rootNpm.stdout));

const frontendNpm = runAndCapture(
  "npx",
  [
    "--yes",
    npmLicenseTool,
    "--json",
    "--excludePrivatePackages",
    "--relativeLicensePath",
    "--relativeModulePath",
  ],
  frontendDir,
);

writeReport("frontend-npm.json", frontendNpm.stdout);
writeReport("frontend-npm-summary.txt", summarizeNpmLicenses(frontendNpm.stdout));

const backendGo = runAndCapture(
  "go",
  ["run", `github.com/google/go-licenses/v2@${goLicensesVersion}`, "report", "./cmd/api"],
  backendDir,
);

writeReport("backend-go.csv", backendGo.stdout);
writeReport("backend-go-summary.txt", summarizeGoLicenses(backendGo.stdout));

if (backendGo.stderr.trim()) {
  writeReport("backend-go-warnings.txt", backendGo.stderr);
}

writeReport(
  "README.md",
  [
    "# License Reports",
    "",
    `Generated from \`${path.basename(root)}\` on ${new Date().toISOString()}.`,
    "",
    "Files:",
    "",
    "- `root-npm.json`: root workspace npm dependency license inventory.",
    "- `root-npm-summary.txt`: aggregated license counts for the root workspace.",
    "- `frontend-npm.json`: frontend workspace npm dependency license inventory.",
    "- `frontend-npm-summary.txt`: aggregated license counts for the frontend workspace.",
    "- `backend-go.csv`: Go dependency license report for `./cmd/api`.",
    "- `backend-go-summary.txt`: aggregated license counts for the Go dependency report.",
    "- `backend-go-warnings.txt`: warnings emitted while inspecting Go dependencies, when present.",
    "",
    "These reports are generated artifacts and should not be committed.",
  ].join("\n"),
);

console.log(`Created license reports in ${path.relative(root, reportDir)}`);
