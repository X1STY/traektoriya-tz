import { type SubmitEvent, useEffect } from 'react'
import { useUpdateCarPresenter } from '@/entities/case/car/update/presenter'
import { Button } from '@/shared/components/ui/button.tsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog.tsx'
import { Input } from '@/shared/components/ui/input.tsx'
import { Label } from '@/shared/components/ui/label.tsx'
import { cn } from '@/shared/lib/utils.ts'
import type { ICarDto } from '@/shared/interface/car'

interface UpdateCarModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  car: ICarDto | null
}

export const UpdateCarModal = ({ open, onOpenChange, car }: UpdateCarModalProps) => {
  const { form, onSubmit, setCar } = useUpdateCarPresenter()

  useEffect(() => {
    if (car && open) {
      setCar(car)
    }
  }, [car?.id, open])

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    onSubmit()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-neutral-200 bg-white/95 backdrop-blur-sm">
        <DialogHeader className="space-y-1">
          <DialogTitle className="font-serif text-2xl tracking-tight">Редактирование</DialogTitle>
          <DialogDescription className="text-muted-foreground">Измените название и цену автомобиля</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">
              Марка
            </Label>
            <Input
              id="name"
              {...form.register('name', { valueAsNumber: false })}
              placeholder="Toyota"
              className={cn(
                'border-neutral-200 bg-neutral-50/50',
                'focus:border-neutral-900 focus:ring-neutral-900/20',
                'transition-all duration-200',
                form.formState.errors.name && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              )}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-xs uppercase tracking-wider text-muted-foreground">
              Цена (₽)
            </Label>
            <Input
              id="price"
              type="number"
              {...form.register('price', { valueAsNumber: true })}
              placeholder="2100000"
              min="0"
              step="1000"
              className={cn(
                'border-neutral-200 bg-neutral-50/50',
                'focus:border-neutral-900 focus:ring-neutral-900/20',
                'transition-all duration-200',
                form.formState.errors.price && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              )}
            />
            {form.formState.errors.price && (
              <p className="text-xs text-destructive">{form.formState.errors.price.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-neutral-200 hover:bg-neutral-100"
              onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button
              type="submit"
              className={cn(
                'flex-1 bg-neutral-900 text-white hover:bg-neutral-800',
                'shadow-lg shadow-neutral-900/20',
                'transition-all duration-200',
              )}>
              Сохранить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
