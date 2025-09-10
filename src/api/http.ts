import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8080'
export const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

// Interceptors (logging + basic error normalization)
http.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status
    const message = error?.response?.data?.error || 'Error inesperado'
    return Promise.reject({ status, message })
  }
)

export function apiUrl(path: string) {
  return `${baseURL}${path.startsWith('/') ? '' : '/'}${path}`
}
