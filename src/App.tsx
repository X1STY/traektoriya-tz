import { QueryClientProvider } from '@tanstack/react-query'
import CarCatalogPage from '@/pages/car-catalog'
import { client } from '@/app/providers/react-query'

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <CarCatalogPage />
    </QueryClientProvider>
  )
}

export default App
