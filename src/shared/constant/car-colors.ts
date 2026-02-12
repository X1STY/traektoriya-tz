export const CAR_COLORS = [
  { value: 'red', label: 'Красный', bg: 'bg-red-500' },
  { value: 'black', label: 'Чёрный', bg: 'bg-neutral-900' },
  { value: 'white', label: 'Белый', bg: 'bg-white border border-neutral-200' },
  { value: 'blue', label: 'Синий', bg: 'bg-blue-600' },
  { value: 'silver', label: 'Серебристый', bg: 'bg-neutral-400' },
] as const

export const CAR_COLOR_MAP: Record<string, string> = {
  red: 'bg-red-500',
  black: 'bg-neutral-900',
  white: 'bg-white border border-neutral-200',
  blue: 'bg-blue-600',
  silver: 'bg-neutral-400',
}

export const CAR_COLOR_NAME_MAP: Record<string, string> = {
  red: 'Красный',
  black: 'Чёрный',
  white: 'Белый',
  blue: 'Синий',
  silver: 'Серебристый',
}

export type CarColor = typeof CAR_COLORS[number]['value']
