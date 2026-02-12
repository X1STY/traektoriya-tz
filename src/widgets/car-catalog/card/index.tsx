import { Badge } from '@/shared/components/ui/badge.tsx'
import { Card } from '@/shared/components/ui/card.tsx'
import type { ICarDto } from '@/shared/interface/car'
import { cn } from '@/shared/lib/utils.ts'
import { CAR_COLOR_MAP, CAR_COLOR_NAME_MAP } from '@/shared/constant/car-colors'
import { MapPin, Pencil, Trash2 } from 'lucide-react'
import type { CSSProperties } from 'react'

interface CarCardProps {
  car: ICarDto
  className?: string
  style?: CSSProperties
  onEdit?: (car: ICarDto) => void
  onDelete?: (car: ICarDto) => void
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price)
}

export const CarCard = ({ car, className, style, onEdit, onDelete }: CarCardProps) => {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-0 bg-card shadow-sm transition-all duration-500',
        'hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1',
        'animate-in fade-in-0 slide-in-from-bottom-4',
        className,
      )}
      style={style}>
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-serif text-neutral-300/50 select-none">{car.name.charAt(0)}</div>
        </div>

        <Badge
          variant="secondary"
          className="absolute right-3 top-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
          {car.year}
        </Badge>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className={cn('h-4 w-4 rounded-full shadow-sm ring-2 ring-white/80', CAR_COLOR_MAP[car.color])} />
          <span className="text-xs font-medium text-white drop-shadow-md">{CAR_COLOR_NAME_MAP[car.color]}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-medium tracking-tight text-foreground">
            {car.name} {car.model}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          <MapPin className="h-3 w-3" />
          <span>
            {car.latitude.toFixed(2)}, {car.longitude.toFixed(2)}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Цена</span>
            <p className="font-serif text-2xl text-foreground">{formatPrice(car.price)}</p>
          </div>

          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(car)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 transition-all duration-200 hover:bg-neutral-900 hover:text-white"
                aria-label="Редактировать">
                <Pencil className="h-3.5 w-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(car)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 transition-all duration-200 hover:bg-red-600 hover:text-white"
                aria-label="Удалить">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-neutral-900 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Card>
  )
}
