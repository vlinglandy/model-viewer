import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './src',
  resolve: {
    alias: {
      '@cheese/model-viewer': path.resolve(__dirname, '../packages/model-viewer/src/index.ts')
    }
  },
  build: {
    outDir: '../dist'
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})