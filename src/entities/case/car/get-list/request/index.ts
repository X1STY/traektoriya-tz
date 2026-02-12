import { useSuspenseQuery } from '@tanstack/react-query'
import { getCarsSlice } from '@/entities/slice/car'
import { EQueryKeys } from '@/shared/enum/query-keys'

const useGetCarsRequest = () => {
  return useSuspenseQuery({
    queryFn: getCarsSlice,
    queryKey: [EQueryKeys.GET_CARS],
  })
}

export { useGetCarsRequest }
