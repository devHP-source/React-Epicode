import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {
        chrome: 87 << 16,
        firefox: 103 << 16,
        safari: 15 << 16,
      },
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
})
