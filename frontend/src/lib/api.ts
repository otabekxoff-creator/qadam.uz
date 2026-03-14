import axios from 'axios'
import { useAuthStore } from '@/store/auth.store'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // QO'SHILDI: Cookie'larni doim serverga yuboradi va serverdan qabul qiladi
  withCredentials: true, 
})

api.interceptors.request.use((config) => {
  // Ehtiyot shart va to'liq moslashuvchanlik uchun token'ni Authorization header'ga 
  // qo'shib yuborish mantig'ini ham qoldirib ketyapmiz.
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 401 xatolik (Unauthorized) kelganda avtomatik profilni tozalaymiz
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

export default api
