import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // Specify the root directory where your index.html is located
  build: {
    outDir: 'dist', // Specify output directory
  }
})
