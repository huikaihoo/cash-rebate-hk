import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'HK Cash Rebate Calculator',
        short_name: 'HK Cash Rebate',
        description: 'A simple cash rebate calculator for shopping in Hong Kong',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
