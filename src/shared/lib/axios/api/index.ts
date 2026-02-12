import axios from 'axios'

const HTTP_CLIENT = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  withCredentials: true,
})

export { HTTP_CLIENT }
