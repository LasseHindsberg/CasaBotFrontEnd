import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// Set base to '/CasaBotFrontEnd/' for GitHub Pages project page deployment
export default defineConfig({
  base: '/CasaBotFrontEnd/',
  plugins: [
    vue(),
    tailwindcss()
  ],
})
