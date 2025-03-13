export default function manualChunks(id: string) {
  if (id.includes('node_modules')) {
    // UI libraries chunks
    if (id.includes('vaul')) return 'vaul'
    if (id.includes('cmdk')) return 'cmdk'
    if (id.includes('@floating-ui')) return 'floating-ui'
    if (id.includes('@radix-ui') || id.includes('lucide')) return 'radix-ui'
    if (id.includes('tailwind')) return 'tailwind'

    // Utility libraries chunks
    if (id.includes('i18next')) return 'i18next'
    if (id.includes('lodash')) return 'lodash'
    if (id.includes('axios')) return 'axios'
    if (id.includes('dexie')) return 'dexie'

    // Other vendor chunks
    return 'vendor'
  }

  // Split each page into its own chunk
  if (id.includes('/src/pages/')) {
    const relativePath = id.split('/src/pages/')[1]
    const folderName = relativePath.split('/')[0]
    return `page-${folderName.toLowerCase()}`
  }

  // Components chunks
  if (id.includes('/src/components/')) return 'components'

  return 'index'
}
