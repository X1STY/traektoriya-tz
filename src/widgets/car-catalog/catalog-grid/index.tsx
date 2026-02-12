import { Skeleton } from '@/shared/components/ui/skeleton.tsx'
import { Package } from 'lucide-react'
import type { ICarDto } from '@/shared/interface/car'
import { CarCard } from '../card'
import { cn } from '@/shared/lib/utils.ts'

interface CarGridProps {
  cars: ICarDto[]
  isLoading?: boolean
  className?: string
  onEdit?: (car: ICarDto) => void
  onDelete?: (car: ICarDto) => void
}

const CarCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card">
    <Skeleton className="aspect-[16/10] w-full" />
    <div className="p-5">
      <Skeleton className="mb-3 h-6 w-3/4" />
      <Skeleton className="mb-4 h-4 w-1/2" />
      <div className="flex items-end justify-between">
        <div>
          <Skeleton className="mb-1 h-3 w-8" />
          <Skeleton className="h-7 w-24" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  </div>
)

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-20">
    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
      <Package className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
    </div>
    <h3 className="mb-2 font-serif text-xl text-foreground">Автомобили не найдены</h3>
    <p className="text-sm text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
  </div>
)

export const CarGrid = ({ cars, isLoading, className, onEdit, onDelete }: CarGridProps) => {
  if (isLoading) {
    return (
      <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (cars.length === 0) {
    return <EmptyState />
  }

  return (
    <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3', className)}>
      {cars.map((car, index) => (
        <CarCard
          key={car.id}
          car={car}
          onEdit={onEdit}
          onDelete={onDelete}
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  )
}
