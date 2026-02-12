import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCarStore } from '@/entities/store/car'
import type { ICarDto } from '@/shared/interface/car'

const UPDATE_CAR_SCHEMA = z.object({
  id: z.number(),
  name: z.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
  price: z.number().min(1000, 'Минимальная цена 1 000 ₽').max(100000000, 'Максимальная цена 100 000 000 ₽'),
})

type UpdateCarFormValues = z.infer<typeof UPDATE_CAR_SCHEMA>

const DEFAULT_VALUES: UpdateCarFormValues = {
  id: 0,
  name: '',
  price: 0,
}

const useUpdateCarPresenter = () => {
  const updateCar = useCarStore((s) => s.updateCar)

  const form = useForm<UpdateCarFormValues>({
    resolver: zodResolver(UPDATE_CAR_SCHEMA),
    defaultValues: DEFAULT_VALUES,
  })

  const setCar = (car: ICarDto) => {
    form.reset({ id: car.id, name: car.name, price: car.price })
  }

  const onSubmit = form.handleSubmit(({ id, ...newFields }) => {
    updateCar(id, newFields)
    form.reset(DEFAULT_VALUES)
  })

  return { form, onSubmit, setCar }
}

export { useUpdateCarPresenter }
