import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  // The folder the site is served from. '/' for a real domain; the GitHub
  // Pages workflow sets BASE_PATH=/Dercksen-Construction-website-demo/.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    // Films and photos live in public/media and are served as-is.
    target: 'es2020',
  },
});
