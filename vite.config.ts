import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta onde o Frontend vai rodar
    cors: true,  // Habilita CORS no servidor de desenvolvimento
  }
})