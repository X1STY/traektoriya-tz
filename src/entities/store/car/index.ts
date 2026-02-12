import type { ICarDto, SortBy, SortOrder } from '@/shared/interface/car'
import { create } from 'zustand'

interface ICarStore {
  cars: ICarDto[]
  isLoading: boolean
  error: string | null
  sortBy: SortBy
  sortOrder: SortOrder
  filteredCars: ICarDto[]

  setCars: (cars: ICarDto[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  addCar: (car: Omit<ICarDto, 'id'>) => void
  updateCar: (id: number, updates: Partial<Pick<ICarDto, 'name' | 'price'>>) => void
  deleteCar: (id: number) => void

  setSortBy: (sortBy: SortBy) => void
  toggleSortOrder: () => void
}

export const useCarStore = create<ICarStore>((set) => ({
  cars: [],
  isLoading: false,
  error: null,
  sortBy: null,
  sortOrder: 'asc',
  filteredCars: [],

  setCars: (cars) => set({ cars, filteredCars: cars }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  addCar: (car) =>
    set((state) => {
      const newCar: ICarDto = {
        ...car,
        id: Date.now(),
      }
      const newCars = [...state.cars, newCar]
      return {
        cars: newCars,
        filteredCars: applySort(newCars, state.sortBy, state.sortOrder),
      }
    }),

  updateCar: (id, updates) =>
    set((state) => {
      const newCars = state.cars.map((car) => (car.id === id ? { ...car, ...updates } : car))
      return {
        cars: newCars,
        filteredCars: applySort(newCars, state.sortBy, state.sortOrder),
      }
    }),

  deleteCar: (id) =>
    set((state) => {
      const newCars = state.cars.filter((car) => car.id !== id)
      return {
        cars: newCars,
        filteredCars: applySort(newCars, state.sortBy, state.sortOrder),
      }
    }),

  setSortBy: (sortBy) =>
    set((state) => ({
      sortBy,
      filteredCars: applySort(state.cars, sortBy, state.sortOrder),
    })),

  toggleSortOrder: () =>
    set((state) => {
      const newOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
      return {
        sortOrder: newOrder,
        filteredCars: applySort(state.cars, state.sortBy, newOrder),
      }
    }),
}))

function applySort(cars: ICarDto[], sortBy: SortBy, sortOrder: SortOrder): ICarDto[] {
  if (!sortBy) return cars

  return [...cars].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
    }
  })
}
