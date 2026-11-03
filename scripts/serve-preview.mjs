// Local preview of the production build, always run from the real D: path
// (next start errors when launched through the C: junction).
//   node scripts/serve-preview.mjs [port]
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.argv[2] ?? "3111";
const next = path.join(root, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [next, "start", "-p", port], {
  cwd: root,
  stdio: "inherit",
});
child.on("exit", (code) => process.exit(code ?? 0));
