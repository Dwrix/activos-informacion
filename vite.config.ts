import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
/*  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: '192.168.206.36', // aquí debes cambiar la dirección IP por la del servidor DNS interno que deseas usar
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },  */
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
