import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // the legal pages are separate HTML entries, so a static host serves them without a rewrite rule
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'adatkezelesi-tajekoztato/index.html'),
        imprint: resolve(import.meta.dirname, 'impresszum/index.html'),
        terms: resolve(import.meta.dirname, 'aszf/index.html'),
      },
    },
  },
})
