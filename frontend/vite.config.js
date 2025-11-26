import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const base = mode === 'production' ? '/To-Do-List-App/' : '/';
  
  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.js', '.jsx', '.json']
    },
    server: {
      port: 5173,
      strictPort: true,
      open: true,
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [
          { from: /^\/src\/pages\//, to: '/' },
        ]
      },
      proxy: {
        // Add your API proxy settings here if needed
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'mui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
          },
        },
      },
    },
  };
});
