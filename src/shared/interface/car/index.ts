interface ICarDto {
  id: number
  name: string
  model: string
  year: number
  color: string
  price: number
  latitude: number
  longitude: number
}

type SortBy = 'year' | 'price' | null
type SortOrder = 'asc' | 'desc'

export type { ICarDto, SortBy, SortOrder }
