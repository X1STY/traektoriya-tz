import { useCarStore } from '@/entities/store/car'
import type { ICarDto } from '@/shared/interface/car'

const useDeleteCarPresenter = () => {
  const deleteCar = useCarStore((s) => s.deleteCar)

  const deleteCarById = (car: ICarDto, onSuccess?: () => void) => {
    deleteCar(car.id)
    onSuccess?.()
  }

  return { deleteCarById }
}

export { useDeleteCarPresenter }
