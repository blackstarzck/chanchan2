import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@chanchan2/ui/styles.css",
        replacement: path.resolve(rootDir, "../../packages/ui/src/styles.css")
      },
      {
        find: "@chanchan2/tokens/theme.css",
        replacement: path.resolve(rootDir, "../../packages/tokens/theme.css")
      },
      {
        find: "@chanchan2/ui",
        replacement: path.resolve(rootDir, "../../packages/ui/src/index.ts")
      },
      {
        find: "@chanchan2/tokens",
        replacement: path.resolve(rootDir, "../../packages/tokens/src/index.ts")
      }
    ]
  }
});
