import { spawnSync } from "node:child_process";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

const backendImage = process.env.BACKEND_IMAGE;
const frontendImage = process.env.FRONTEND_IMAGE;

if (!backendImage || !frontendImage) {
  console.error("Set BACKEND_IMAGE and FRONTEND_IMAGE before running the release smoke check.");
  process.exit(1);
}

const backendUrl = process.env.BACKEND_SMOKE_URL ?? "http://127.0.0.1:8080";
const frontendUrl = process.env.FRONTEND_SMOKE_URL ?? "http://127.0.0.1:3000";
const postgresContainer = `go-kit-postgres-smoke-${Date.now()}`;
const backendContainer = `go-kit-backend-smoke-${Date.now()}`;
const frontendContainer = `go-kit-frontend-smoke-${Date.now()}`;
const networkName = `go-kit-smoke-${Date.now()}`;

let cleanedUp = false;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    shell: process.platform === "win32",
    stdio: options.capture ? "pipe" : "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (!options.allowFailure && result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(
      details
        ? `Command failed: ${command} ${args.join(" ")}\n${details}`
        : `Command failed: ${command} ${args.join(" ")}`,
    );
  }

  return result;
}

async function waitFor(label, action, options = {}) {
  const attempts = options.attempts ?? 30;
  const intervalMs = options.intervalMs ?? 2000;
  let lastError = new Error(`${label} did not finish.`);

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await action();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === attempts) {
        break;
      }

      console.log(`${label} not ready yet (${attempt}/${attempts}). Retrying...`);
      await delay(intervalMs);
    }
  }

  throw lastError;
}

async function expectText(url, snippet) {
  const response = await fetch(url);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Expected ${url} to return 2xx, received ${response.status}.`);
  }

  if (!text.includes(snippet)) {
    throw new Error(`Expected ${url} to include "${snippet}".`);
  }
}

async function expectJson(url, predicate, label, init) {
  const response = await fetch(url, init);
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`Expected ${url} to return 2xx, received ${response.status}.\n${body}`);
  }

  const payload = JSON.parse(body);
  if (!predicate(payload)) {
    throw new Error(`Unexpected payload for ${label}.`);
  }

  return payload;
}

async function loginDemoUser() {
  return expectJson(
    `${backendUrl}/api/v1/auth/login`,
    (payload) => typeof payload?.access_token === "string" && payload.access_token.length > 0,
    "demo login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "demo@nextjs-go-kit.local",
        password: "demo12345",
      }),
    },
  );
}

function cleanup() {
  if (cleanedUp) {
    return;
  }

  cleanedUp = true;

  run("docker", ["rm", "-f", frontendContainer], { allowFailure: true });
  run("docker", ["rm", "-f", backendContainer], { allowFailure: true });
  run("docker", ["rm", "-f", postgresContainer], { allowFailure: true });
  run("docker", ["network", "rm", networkName], { allowFailure: true });
}

function printContainerLogs() {
  console.log("\nPostgres container logs:");
  run("docker", ["logs", postgresContainer], { allowFailure: true });

  console.log("\nBackend container logs:");
  run("docker", ["logs", backendContainer], { allowFailure: true });

  console.log("\nFrontend container logs:");
  run("docker", ["logs", frontendContainer], { allowFailure: true });
}

process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});

process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

try {
  run("docker", ["network", "create", networkName]);

  await waitFor(
    "Backend image pull",
    async () => {
      run("docker", ["pull", backendImage], { capture: true });
    },
    { attempts: 12, intervalMs: 10000 },
  );

  await waitFor(
    "Frontend image pull",
    async () => {
      run("docker", ["pull", frontendImage], { capture: true });
    },
    { attempts: 12, intervalMs: 10000 },
  );

  run("docker", [
    "run",
    "--detach",
    "--rm",
    "--name",
    postgresContainer,
    "--network",
    networkName,
    "-e",
    "POSTGRES_DB=app_db",
    "-e",
    "POSTGRES_USER=postgres",
    "-e",
    "POSTGRES_PASSWORD=db_password",
    "postgres:17-alpine",
  ]);

  await waitFor(
    "Postgres readiness",
    async () => {
      const result = run(
        "docker",
        ["exec", postgresContainer, "pg_isready", "-U", "postgres", "-d", "app_db"],
        { capture: true, allowFailure: true },
      );

      if (result.status !== 0) {
        throw new Error("Postgres is not ready yet.");
      }
    },
    { attempts: 30, intervalMs: 3000 },
  );

  run("docker", [
    "run",
    "--detach",
    "--rm",
    "--name",
    backendContainer,
    "--network",
    networkName,
    "--publish",
    "8080:8080",
    "--env",
    "APP_ENV=production",
    "--env",
    "APP_BASE_URL=http://127.0.0.1:8080",
    "--env",
    "FRONTEND_APP_URL=http://127.0.0.1:3000",
    "--env",
    "CORS_ALLOWED_ORIGINS=http://127.0.0.1:3000",
    "--env",
    "DB_HOST=" + postgresContainer,
    "--env",
    "DB_PORT=5432",
    "--env",
    "DB_NAME=app_db",
    "--env",
    "DB_USER=postgres",
    "--env",
    "DB_PASSWORD=db_password",
    "--env",
    "DB_SSLMODE=disable",
    "--env",
    "DB_SCHEMA=public",
    "--env",
    "DASHBOARD_OWNER_EMAIL=demo@nextjs-go-kit.local",
    "--env",
    "DEMO_SEED_ENABLED=true",
    "--env",
    "DEMO_USER_EMAIL=demo@nextjs-go-kit.local",
    "--env",
    "DEMO_USER_PASSWORD=demo12345",
    "--env",
    "DEMO_USER_USERNAME=nextjs-go-demo",
    "--env",
    "DEMO_USER_FULL_NAME=Next.js Go Demo",
    backendImage,
  ]);

  await waitFor(
    "Backend health",
    async () =>
      expectJson(
        `${backendUrl}/health`,
        (payload) => payload?.database === "connected",
        "backend health",
      ),
    { attempts: 40, intervalMs: 3000 },
  );

  await expectJson(
    `${backendUrl}/api/v1/resources`,
    (payload) => Array.isArray(payload?.data),
    "resources list",
  );

  await loginDemoUser();

  run("docker", [
    "run",
    "--detach",
    "--rm",
    "--name",
    frontendContainer,
    "--network",
    networkName,
    "--publish",
    "3000:3000",
    frontendImage,
  ]);

  await waitFor(
    "Frontend home page",
    async () =>
      expectText(
        frontendUrl,
        "General-purpose full-stack app template with auth, protected flows, and production-ready defaults.",
      ),
    { attempts: 30, intervalMs: 3000 },
  );

  await expectText(`${frontendUrl}/login`, "Welcome back");

  console.log("Release smoke check passed.");
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  printContainerLogs();
  process.exitCode = 1;
} finally {
  cleanup();
}
