import { QueryClient } from '@tanstack/react-query'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      networkMode: 'always',
    },
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      networkMode: 'always',
    },
  },
})

export { client }
