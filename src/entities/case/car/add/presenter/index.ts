import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCarStore } from '@/entities/store/car'

const ADD_CAR_SCHEMA = z.object({
  name: z.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
  model: z.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
  year: z
    .number()
    .int('Год должен быть целым числом')
    .min(1900, 'Год не может быть раньше 1900')
    .max(new Date().getFullYear() + 1, 'Год не может быть в будущем'),
  color: z.string().min(2, 'Выберите цвет'),
  price: z.number().min(1000, 'Минимальная цена 1 000 ₽').max(100000000, 'Максимальная цена 100 000 000 ₽'),
})

const useAddCarPresenter = () => {
  const { addCar } = useCarStore()
  const form = useForm({
    resolver: zodResolver(ADD_CAR_SCHEMA),
    defaultValues: {
      name: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      price: 0,
    },
  })
  const handleSubmit = (onSubmitSuccess: () => void) => {
    return form.handleSubmit((newCar) => {
      const latitude = 55.75 + (Math.random() - 0.5) * 0.1
      const longitude = 37.62 + (Math.random() - 0.5) * 0.1
      addCar({ ...newCar, latitude, longitude })
      form.reset()
      onSubmitSuccess()
    })
  }

  return { form, handleSubmit }
}

export { useAddCarPresenter }
