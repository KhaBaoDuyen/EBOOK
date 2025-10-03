import type { AppConfig } from "@remix-run/dev";

export default {
  appDirectory: "app",
  serverModuleFormat: "esm",
  serverPlatform: "node",
  ignoredRouteFiles: ["**/.*"],
  tailwind: true
} satisfies AppConfig;
