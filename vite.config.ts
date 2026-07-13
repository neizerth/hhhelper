import path from "node:path";
import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
      "@shared": path.resolve(rootDir, "src/slices/shared"),
      "@entities": path.resolve(rootDir, "src/slices/entities"),
      "@modules": path.resolve(rootDir, "src/slices/modules"),
      "@features": path.resolve(rootDir, "src/slices/features"),
      "@widgets": path.resolve(rootDir, "src/slices/widgets"),
      "@pages": path.resolve(rootDir, "src/slices/pages"),
      "@app": path.resolve(rootDir, "src/slices/app"),
    },
    ...(process.env.VITEST
      ? { conditions: ["browser"] }
      : { conditions: ["svelte", "browser", "module", "import"] }),
  },
  plugins: [
    svelte(),
    !process.env.VITEST &&
      webExtension({
        manifest: generateManifest,
        watchFilePaths: ["package.json", "src/manifest.json"],
        disableAutoLaunch: process.env.VITE_EXTENSION_AUTO_LAUNCH !== "true",
      }),
  ].filter(Boolean),
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{js,ts}"],
    clearMocks: true,
    alias: {
      "webextension-polyfill": path.resolve(
        rootDir,
        "src/test/mocks/webextension-polyfill.ts",
      ),
    },
  },
});
