import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: 'BazarBhai - Take controll',
        short_name: 'Admin',
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
    port: 3001
  }
})
