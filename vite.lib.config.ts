/**
 * Library build config — outputs boilerhaus-ui as an installable package.
 *
 * Produces:
 *   dist/index.js      — ESM bundle
 *   dist/index.cjs     — CJS bundle (for older toolchains)
 *   dist/tokens.css    — raw CSS tokens (no Tailwind base, consumers handle that)
 *   dist/*.d.ts        — TypeScript declarations (via tsc, see build:lib script)
 *
 * Does NOT include the Tailwind plugin — components ship as class-name strings.
 * Consumers run Tailwind in their own app and add:
 *   @source "../node_modules/boilerhaus-ui/dist";
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { copyFileSync } from 'node:fs'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    // Copy raw tokens.css into dist so consumers can import it directly.
    // No Tailwind processing here — the @theme block is processed by the
    // consumer's own Tailwind pipeline.
    {
      name: 'copy-tokens-css',
      closeBundle() {
        copyFileSync(
          path.join(dirname, 'src/tokens/tokens.css'),
          path.join(dirname, 'dist/tokens.css'),
        )
      },
    },
  ],

  build: {
    lib: {
      entry:    path.resolve(dirname, 'src/index.ts'),
      formats:  ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      // React must be provided by the consumer — never bundle it.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    // Inline transitive deps (Radix Slot, clsx, tailwind-merge) — all small,
    // avoids requiring consumers to install them separately.
    outDir:        'dist',
    emptyOutDir:   true,
    sourcemap:     true,
    // Don't copy public/ assets (favicon, icons) into the lib dist
    copyPublicDir: false,
  },
})
