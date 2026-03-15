import { copyFileSync, existsSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const frontendDir = path.join(root, "frontend");
const backendDir = path.join(root, "backend");
const postgresContainer = "nextjs-go-monorepo-kit-e2e-postgres";
const postgresPort = "55432";
const smokeHost = "127.0.0.1";
const startedChildren = [];

function ensureFile(targetPath, examplePath) {
  if (!existsSync(targetPath) && existsSync(examplePath)) {
    copyFileSync(examplePath, targetPath);
    console.log(`Created ${path.relative(root, targetPath)} from example`);
  }
}

function runSync(command, args, options = {}) {
  console.log(`> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    shell: process.platform === "win32",
    stdio: options.captureOutput ? "pipe" : "inherit",
    cwd: options.cwd ?? root,
    env: options.env ?? process.env,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    if (options.captureOutput && result.stdout) {
      process.stdout.write(result.stdout);
    }
    if (options.captureOutput && result.stderr) {
      process.stderr.write(result.stderr);
    }
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }

  return result;
}

function runBackground(command, args, options = {}) {
  console.log(`> ${command} ${args.join(" ")} (background)`);
  const child = spawn(command, args, {
    shell: process.platform === "win32",
    stdio: "inherit",
    cwd: options.cwd ?? root,
    env: options.env ?? process.env,
  });

  startedChildren.push(child);
  return child;
}

function getBaseUrl(port) {
  return `http://${smokeHost}:${port}`;
}

function createSmokeBackendEnv({ backendPort, backendBaseUrl, frontendBaseUrl }) {
  return {
    APP_NAME: "Next.js Go Monorepo Kit API",
    APP_ENV: "development",
    APP_PORT: String(backendPort),
    APP_HOST: smokeHost,
    APP_BASE_URL: backendBaseUrl,
    FRONTEND_APP_URL: frontendBaseUrl,
    CORS_ALLOWED_ORIGINS: frontendBaseUrl,
    DB_HOST: smokeHost,
    DB_PORT: postgresPort,
    DB_NAME: "app_db",
    DB_USER: "postgres",
    DB_PASSWORD: "db_password",
    DB_SSLMODE: "disable",
    DB_SCHEMA: "public",
    DASHBOARD_OWNER_EMAIL: "demo@nextjs-go-kit.local",
    DEMO_SEED_ENABLED: "true",
    DEMO_USER_EMAIL: "demo@nextjs-go-kit.local",
    DEMO_USER_PASSWORD: "demo12345",
    DEMO_USER_USERNAME: "nextjs-go-demo",
    DEMO_USER_FULL_NAME: "Next.js Go Demo",
  };
}

function createSmokeFrontendEnv({ backendBaseUrl }) {
  return {
    NEXT_PUBLIC_APP_NAME: "Next.js Go Monorepo Kit",
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    NEXT_PUBLIC_API_BASE_URL: `${backendBaseUrl}/api/v1`,
    NEXT_PUBLIC_DASHBOARD_OWNER_EMAIL: "demo@nextjs-go-kit.local",
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "",
    NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC: "",
    NEXT_PUBLIC_DEMO_EMAIL: "demo@nextjs-go-kit.local",
    NEXT_PUBLIC_DEMO_PASSWORD: "demo12345",
  };
}

function findAvailablePort(preferredPort) {
  const probePort = (port) =>
    new Promise((resolve, reject) => {
      const server = createServer();

      server.unref();
      server.once("error", () => resolve(null));
      server.listen({ host: smokeHost, port }, () => {
        const address = server.address();
        const resolvedPort =
          typeof address === "object" && address ? address.port : port;

        server.close((closeError) => {
          if (closeError) {
            reject(closeError);
            return;
          }

          resolve(resolvedPort);
        });
      });
    });

  return probePort(preferredPort).then(async (port) => {
    if (port !== null) {
      return port;
    }

    const fallbackPort = await probePort(0);
    if (fallbackPort !== null) {
      return fallbackPort;
    }

    throw new Error(`Unable to find an open port for ${preferredPort}`);
  });
}

async function waitFor(check, { label, timeoutMs = 120000, intervalMs = 1500 }) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (await check()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Timed out waiting for ${label}`);
}

function removePostgresContainer() {
  const result = spawnSync("docker", ["rm", "-f", postgresContainer], {
    shell: process.platform === "win32",
    stdio: "pipe",
    cwd: root,
    env: process.env,
    encoding: "utf8",
  });

  if (result.status !== 0 && !`${result.stderr ?? ""}`.includes("No such container")) {
    throw new Error("Unable to remove the disposable Playwright Postgres container.");
  }
}

function startPostgresContainer() {
  console.log("Starting disposable PostgreSQL container for Playwright...");
  removePostgresContainer();
  runSync("docker", [
    "run",
    "--name",
    postgresContainer,
    "-e",
    "POSTGRES_DB=app_db",
    "-e",
    "POSTGRES_USER=postgres",
    "-e",
    "POSTGRES_PASSWORD=db_password",
    "-p",
    `${postgresPort}:5432`,
    "-d",
    "postgres:17-alpine",
  ]);
}

async function waitForPostgres() {
  console.log("Waiting for Postgres to become ready...");
  await waitFor(
    async () => {
      const result = spawnSync(
        "docker",
        [
          "exec",
          postgresContainer,
          "pg_isready",
          "-U",
          "postgres",
          "-d",
          "app_db",
        ],
        {
          shell: process.platform === "win32",
          stdio: "pipe",
          cwd: root,
          env: process.env,
          encoding: "utf8",
        },
      );

      return result.status === 0;
    },
    { label: "Postgres readiness", timeoutMs: 90000 },
  );
}

async function waitForUrl(url, label) {
  console.log(`Waiting for ${label} at ${url}...`);
  await waitFor(
    async () => {
      try {
        const response = await fetch(url);
        return response.ok;
      } catch {
        return false;
      }
    },
    { label },
  );
}

function terminateChild(child) {
  if (!child || child.killed) {
    return;
  }

  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
      stdio: "ignore",
    });
    return;
  }

  child.kill("SIGTERM");
}

let isCleaningUp = false;

async function cleanup() {
  if (isCleaningUp) {
    return;
  }

  isCleaningUp = true;

  for (const child of startedChildren.reverse()) {
    terminateChild(child);
  }

  try {
    removePostgresContainer();
  } catch (error) {
    console.error("Failed to remove the disposable Postgres container:", error);
  }
}

async function main() {
  ensureFile(
    path.join(frontendDir, ".env.local"),
    path.join(frontendDir, ".env.example"),
  );
  ensureFile(path.join(backendDir, ".env"), path.join(backendDir, ".env.example"));

  const backendPort = await findAvailablePort(8080);
  const frontendPort = await findAvailablePort(3000);
  const backendBaseUrl = getBaseUrl(backendPort);
  const frontendBaseUrl = getBaseUrl(frontendPort);
  const smokeBackendEnv = createSmokeBackendEnv({
    backendPort,
    backendBaseUrl,
    frontendBaseUrl,
  });
  const smokeFrontendEnv = createSmokeFrontendEnv({
    backendBaseUrl,
  });

  console.log(
    `Using smoke test ports backend=${backendPort} frontend=${frontendPort}`,
  );

  startPostgresContainer();
  await waitForPostgres();

  console.log("Starting backend API...");
  runBackground("go", ["run", "./cmd/api"], {
    cwd: backendDir,
    env: {
      ...process.env,
      ...smokeBackendEnv,
    },
  });
  await waitForUrl(`${backendBaseUrl}/health`, "backend health endpoint");

  console.log("Building frontend for browser tests...");
  runSync("npm", ["exec", "--", "next", "build"], {
    cwd: frontendDir,
    env: {
      ...process.env,
      ...smokeFrontendEnv,
    },
  });
  runSync("npm", ["exec", "--", "next-sitemap"], {
    cwd: frontendDir,
    env: {
      ...process.env,
      ...smokeFrontendEnv,
    },
  });

  console.log("Starting frontend app...");
  runBackground(
    "npm",
    ["run", "start", "--", "--hostname", smokeHost, "--port", String(frontendPort)],
    {
      cwd: frontendDir,
      env: {
        ...process.env,
        ...smokeFrontendEnv,
      },
    },
  );
  await waitForUrl(`${frontendBaseUrl}/login`, "frontend login page");

  console.log("Running Playwright smoke tests...");
  runSync("npm", ["run", "e2e:test"], {
    cwd: frontendDir,
    env: {
      ...process.env,
      ...smokeFrontendEnv,
      PLAYWRIGHT_BASE_URL:
        process.env.PLAYWRIGHT_BASE_URL ?? frontendBaseUrl,
      PLAYWRIGHT_DEMO_EMAIL:
        process.env.PLAYWRIGHT_DEMO_EMAIL ?? "demo@nextjs-go-kit.local",
      PLAYWRIGHT_DEMO_PASSWORD:
        process.env.PLAYWRIGHT_DEMO_PASSWORD ?? "demo12345",
    },
  });

  console.log("Playwright smoke tests passed.");
  await cleanup();
}

process.on("SIGINT", () => {
  void cleanup().finally(() => process.exit(130));
});

process.on("SIGTERM", () => {
  void cleanup().finally(() => process.exit(143));
});

main().catch(async (error) => {
  console.error(error);
  await cleanup();
  process.exit(1);
});
