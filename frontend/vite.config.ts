import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },


  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      }
    },

  },

})