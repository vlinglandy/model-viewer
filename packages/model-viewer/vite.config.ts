import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'ModelViewer',
      formats: ['es', 'cjs'],
      fileName: 'model-viewer'
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@google/model-viewer'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@google/model-viewer': 'ModelViewerElement'
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true
  }
})