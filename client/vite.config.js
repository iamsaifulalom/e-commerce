import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa"


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: 'Brandname - Online Marketplace',
        short_name: 'BazarBhai',
        description: 'Shop groceries, electronics, clothes and more at BazarBhai.com',
        theme_color: '#1E293B',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/images/app-logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/app-logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

    })
  ],
  server: {
    port: 3000
  }
})
