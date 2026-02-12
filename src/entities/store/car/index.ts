import type { ICarDto, SortBy, SortOrder } from '@/shared/interface/car'
import { create } from 'zustand'

interface ICarStore {
  cars: ICarDto[]
  isLoading: boolean
  error: string | null
  sortBy: SortBy
  sortOrder: SortOrder

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

  setCars: (cars) => set({ cars }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  addCar: (car) =>
    set((state) => {
      const newCar: ICarDto = {
        ...car,
        id: Date.now(),
      }
      return { cars: [...state.cars, newCar] }
    }),

  updateCar: (id, updates) =>
    set((state) => ({
      cars: state.cars.map((car) => (car.id === id ? { ...car, ...updates } : car)),
    })),

  deleteCar: (id) =>
    set((state) => ({
      cars: state.cars.filter((car) => car.id !== id),
    })),

  setSortBy: (sortBy) => set({ sortBy }),

  toggleSortOrder: () =>
    set((state) => ({
      sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
    })),
}))

export function applySort(cars: ICarDto[], sortBy: SortBy, sortOrder: SortOrder): ICarDto[] {
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

export const selectFilteredCars = (state: ICarStore) => applySort(state.cars, state.sortBy, state.sortOrder)
