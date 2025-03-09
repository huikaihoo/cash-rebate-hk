import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '')

  const enableHttps = env.VITE_ENABLE_HTTPS === 'true'
  const basePath = env.VITE_BASE_URL || '/'

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
              src: 'icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: 'icon_mask.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'maskable',
            },
            {
              src: 'icon_mono.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'monochrome',
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
