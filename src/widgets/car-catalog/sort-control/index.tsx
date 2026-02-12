import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select.tsx'
import { Button } from '@/shared/components/ui/button.tsx'
import { cn } from '@/shared/lib/utils.ts'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { SortBy, SortOrder } from '@/shared/interface/car'

interface SortControlProps {
  sortBy: SortBy
  sortOrder: SortOrder
  onSortByChange: (sortBy: SortBy) => void
  onSortOrderToggle: () => void
  totalResults?: number
  className?: string
}

const sortOptions = [
  { value: 'year', label: 'По году' },
  { value: 'price', label: 'По цене' },
]

export const SortControl = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderToggle,
  totalResults,
  className,
}: SortControlProps) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {totalResults !== undefined && (
            <>
              {totalResults}{' '}
              {totalResults === 1 ? 'автомобиль' : totalResults > 1 && totalResults < 5 ? 'автомобиля' : 'автомобилей'}
            </>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={sortBy || 'default'}
          onValueChange={(value) => onSortByChange(value === 'default' ? null : (value as SortBy))}>
          <SelectTrigger className="h-9 w-[180px] rounded-full border-neutral-200 bg-background text-sm">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="default" className="rounded-lg">
              По умолчанию
            </SelectItem>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="rounded-lg">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={onSortOrderToggle}
          disabled={!sortBy}
          className={cn(
            'h-9 w-9 rounded-full border-neutral-200 transition-all duration-200',
            sortBy && 'hover:bg-neutral-900 hover:text-white',
          )}>
          {!sortBy && <ArrowUpDown className="h-4 w-4" />}
          {sortBy && sortOrder === 'asc' && <ArrowUp className="h-4 w-4" />}
          {sortBy && sortOrder === 'desc' && <ArrowDown className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
