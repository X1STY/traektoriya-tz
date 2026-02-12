import { Badge } from '@/shared/components/ui/badge.tsx'
import { Card } from '@/shared/components/ui/card.tsx'
import type { ICarDto } from '@/shared/interface/car'
import { CAR_COLOR_MAP, CAR_COLOR_NAME_MAP } from '@/shared/constant/car-colors'
import { cn } from '@/shared/lib/utils.ts'
import { CircleDollarSign, Calendar, Palette } from 'lucide-react'

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price)
}

interface CarPopupProps {
  car: ICarDto
}

export const CarPopup = ({ car }: CarPopupProps) => {
  return (
    <Card className="border-0 shadow-none bg-transparent p-0 min-w-[200px]">
      <div className="p-3 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-sm">
            {car.name} {car.model}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-medium">
            {car.year}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Palette className="h-3.5 w-3.5" />
          <div className="flex items-center gap-1.5">
            <div className={cn('h-3 w-3 rounded-full', CAR_COLOR_MAP[car.color])} />
            <span className="text-foreground font-medium">{CAR_COLOR_NAME_MAP[car.color]}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CircleDollarSign className="h-3.5 w-3.5" />
          <span className="font-serif text-sm font-semibold text-foreground">
            {formatPrice(car.price)}
          </span>
        </div>
      </div>
    </Card>
  )
}
