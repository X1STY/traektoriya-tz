import type { ICarDto } from '@/shared/interface/car'
import { carMock } from '@/entities/slice/car/mockData.ts'

const getCarsSlice = async (): Promise<ICarDto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(carMock), 700)
  })

  //return HTTP_CLIENT.get('/test-task/vehicles').then((res) => res.data)
}

export { getCarsSlice }
