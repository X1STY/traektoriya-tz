import { useGetCarsRequest } from '@/entities/case/car/get-list/request'
import { useCarStore } from '@/entities/store/car'
import { useEffect } from 'react'

export const useGetCarsPresenter = () => {
  const { data, isLoading } = useGetCarsRequest()
  const setCars = useCarStore((s) => s.setCars)

  useEffect(() => {
    setCars(data)
  }, [data, setCars])

  return {
    isLoading,
  }
}
