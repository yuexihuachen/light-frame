import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './client/src/main.tsx',
      }
    },
    outDir: './dist/',
    manifest: true
  },
})
