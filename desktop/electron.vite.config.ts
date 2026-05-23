import { defineConfig } from "electron-vite"

export default defineConfig({
  main: {
    build: {
      lib: { entry: "processes/main/main.ts" },
      outDir: "build/main",
      externalizeDeps: {
        exclude: ["@fairspec/engine", "@fairspec/logger", "@fairspec/website"],
      },
    },
  },
  preload: {
    build: {
      lib: {
        entry: "processes/preload/preload.ts",
        formats: ["cjs"],
      },
      outDir: "build/preload",
      externalizeDeps: false,
      rollupOptions: {
        external: ["electron"],
        output: {
          entryFileNames: "preload.js",
        },
      },
    },
  },
  renderer: {
    root: "processes/renderer",
    server: { port: 8100 },
    build: {
      outDir: "build/renderer",
      rollupOptions: {
        input: {
          index: "processes/renderer/index.html",
        },
      },
    },
  },
})
