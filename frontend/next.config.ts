import path from "node:path";
import type { NextConfig } from "next";

const workspaceRoot = path.resolve(process.cwd(), "..");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;
