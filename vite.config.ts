import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '')

  const enableHttps = env.VITE_ENABLE_HTTPS === 'true'
  const basePath = env.VITE_BASE_PATH || '/'

  return {
    base: basePath,
    plugins: [
      react(),
      enableHttps && mkcert(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Cash Rebate Calculator HK',
          short_name: 'Cash Rebate HK',
          description: 'A simple cash rebate calculator for shopping in Hong Kong',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          start_url: basePath,
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
    ].filter(Boolean), // Filter out false values from plugins array
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
