import { defineConfig } from '@vite-pwa/assets-generator/config'
import type { Preset } from '@vite-pwa/assets-generator/config'

const preset: Preset = {
  transparent: {
    sizes: [32],
    favicons: [[32, 'favicon.ico']],
  },
  maskable: {
    sizes: [],
  },
  apple: {
    sizes: [],
    padding: 0,
  },
  assetName: () => {
    return 'favicon.png'
  },
}

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset,
  images: ['public/favicon.svg'],
})
