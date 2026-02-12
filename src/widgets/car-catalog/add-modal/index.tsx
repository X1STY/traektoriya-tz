import { type SyntheticEvent, useState } from 'react'
import { useAddCarPresenter } from '@/entities/case/car/add/presenter'
import { Button } from '@/shared/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog.tsx'
import { Input } from '@/shared/components/ui/input.tsx'
import { Label } from '@/shared/components/ui/label.tsx'
import { CAR_COLORS } from '@/shared/constant/car-colors'
import { Plus } from 'lucide-react'
import { cn } from '@/shared/lib/utils.ts'

export const AddCarModal = () => {
  const [open, setOpen] = useState(false)
  const { form, handleSubmit: handleSubmitForm } = useAddCarPresenter()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    handleSubmitForm(() => setOpen(false))()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'gap-2 bg-neutral-900 text-white hover:bg-neutral-800',
            'shadow-lg shadow-neutral-900/20 transition-all duration-300',
            'hover:shadow-xl hover:shadow-neutral-900/30 hover:-translate-y-0.5',
          )}>
          <Plus className="h-4 w-4" />
          <span>Добавить автомобиль</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="border-neutral-200 bg-white/95 backdrop-blur-sm">
        <DialogHeader className="space-y-1">
          <DialogTitle className="font-serif text-2xl tracking-tight">Новый автомобиль</DialogTitle>
          <DialogDescription className="text-muted-foreground">Добавьте автомобиль в коллекцию</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="model" className="text-xs uppercase tracking-wider text-muted-foreground">
                Модель
              </Label>
              <Input
                id="model"
                {...form.register('model', { valueAsNumber: false })}
                placeholder="Camry"
                className={cn(
                  'border-neutral-200 bg-neutral-50/50',
                  'focus:border-neutral-900 focus:ring-neutral-900/20',
                  'transition-all duration-200',
                  form.formState.errors.model &&
                    'border-destructive focus:border-destructive focus:ring-destructive/20',
                )}
              />
              {form.formState.errors.model && (
                <p className="text-xs text-destructive">{form.formState.errors.model.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-xs uppercase tracking-wider text-muted-foreground">
                Год выпуска
              </Label>
              <Input
                id="year"
                type="number"
                {...form.register('year', { valueAsNumber: true })}
                placeholder="2024"
                min="1900"
                max={new Date().getFullYear() + 1}
                className={cn(
                  'border-neutral-200 bg-neutral-50/50',
                  'focus:border-neutral-900 focus:ring-neutral-900/20',
                  'transition-all duration-200',
                  form.formState.errors.year && 'border-destructive focus:border-destructive focus:ring-destructive/20',
                )}
              />
              {form.formState.errors.year && (
                <p className="text-xs text-destructive">{form.formState.errors.year.message}</p>
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
                  form.formState.errors.price &&
                    'border-destructive focus:border-destructive focus:ring-destructive/20',
                )}
              />
              {form.formState.errors.price && (
                <p className="text-xs text-destructive">{form.formState.errors.price.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="color"
              className={cn(
                'text-xs uppercase tracking-wider text-muted-foreground',
                form.formState.errors.color && 'text-destructive',
              )}>
              Цвет
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {CAR_COLORS.map((color) => (
                <label
                  key={color.value}
                  className={cn(
                    'group relative cursor-pointer rounded-lg border-2 transition-all duration-200',
                    'hover:scale-105 hover:shadow-md',
                    form.watch('color') === color.value
                      ? 'border-neutral-900 ring-2 ring-neutral-900/20'
                      : 'border-transparent hover:border-neutral-300',
                  )}>
                  <input
                    type="radio"
                    {...form.register('color', { valueAsNumber: false })}
                    value={color.value}
                    className="sr-only"
                  />
                  <div className="flex aspect-square items-center justify-center">
                    <div className={cn('h-8 w-8 rounded-full shadow-sm', color.bg)} />
                  </div>
                  <span
                    className={cn(
                      'absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-muted-foreground opacity-0 transition-opacity duration-200',
                      'group-hover:opacity-100',
                    )}>
                    {color.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {form.formState.errors.color && (
            <p className="text-xs text-destructive -mt-2">{form.formState.errors.color.message}</p>
          )}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-neutral-200 hover:bg-neutral-100"
              onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button
              type="submit"
              className={cn(
                'flex-1 bg-neutral-900 text-white hover:bg-neutral-800',
                'shadow-lg shadow-neutral-900/20',
                'transition-all duration-200',
              )}>
              Добавить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
