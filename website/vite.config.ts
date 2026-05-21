import { cloudflare } from "@cloudflare/vite-plugin"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin"
import babel from "@rolldown/plugin-babel"
import tailwind from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import * as settings from "#settings.ts"

export default defineConfig({
  build: { outDir: "build" },
  plugins: [
    devtools(),
    tailwind(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      srcDirectory: ".",
      prerender: { enabled: true },
      sitemap: { enabled: true, host: settings.HOST },
    }),
    react(),
    lingui(),
    babel({
      presets: [linguiTransformerBabelPreset()],
    }),
    svgr(),
  ],
})
