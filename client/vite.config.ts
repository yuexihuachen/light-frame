import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const isProduction = process.env.NODE_ENV === 'production';

const filesName = () => {
  if (isProduction) {
    return {}
  }
  return  {
    entryFileNames: 'assets/[name].js',
    chunkFileNames: 'assets/[name].js',
    assetFileNames: '[name].[ext]',
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "./src/assets",
  build: {
    rollupOptions: {
      input: {
        app: './src/index.tsx',
      },
      output: {
        manualChunks: function manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        ...filesName()
      }
    },
    reportCompressedSize: true,
    emptyOutDir: true,
    outDir: '../server/static',
    manifest: true
  },
})
