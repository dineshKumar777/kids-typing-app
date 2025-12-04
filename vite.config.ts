import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/kids-typing-app/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    sourcemap: true
  }
})
