import axios from 'axios'

const DataUrl = new URL('data/', import.meta.env.VITE_API_URL).href
const ImageUrl = new URL('images/', import.meta.env.VITE_API_URL).href

console.log('VITE_BASE_URL', import.meta.env.VITE_BASE_URL)
console.log('VITE_API_URL', import.meta.env.VITE_API_URL)
console.log('DataUrl', DataUrl)
console.log('ImageUrl', ImageUrl)

export function imageUrl(image: string): string {
  return new URL(image, ImageUrl).href + '.webp'
}

const api = axios.create({
  baseURL: DataUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
