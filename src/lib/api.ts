import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const url = new URL('/data/', baseUrl).href

console.log('BASE_URL', import.meta.env.BASE_URL)
console.log('VITE_BASE_PATH', import.meta.env.VITE_BASE_PATH)
console.log('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL)
console.log('baseUrl', baseUrl)

const api = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
  },
})

export default api
