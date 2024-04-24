import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Target server URL
        changeOrigin: true, // Change origin to match development server
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api from request path
        secure: false, // Disable secure flag for development (optional)
      },
    },
  },
});
