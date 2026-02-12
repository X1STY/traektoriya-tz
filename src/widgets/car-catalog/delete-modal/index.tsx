import { AlertTriangle } from 'lucide-react'
import { Button } from '@/shared/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog.tsx'
import { useDeleteCarPresenter } from '@/entities/case/car/delete/presenter'
import type { ICarDto } from '@/shared/interface/car'

interface DeleteCarModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  car: ICarDto | null
}

export const DeleteCarModal = ({ open, onOpenChange, car }: DeleteCarModalProps) => {
  const { deleteCarById } = useDeleteCarPresenter()

  const handleDelete = () => {
    if (car) {
      deleteCarById(car, () => onOpenChange(false))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-neutral-200 bg-white/95 backdrop-blur-sm max-w-md">
        <DialogHeader className="space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="font-serif text-2xl tracking-tight text-center">
            Подтверждение удаления
          </DialogTitle>
          <DialogDescription className="text-center">
            Вы уверены, что хотите удалить <span className="font-semibold">{car?.name} {car?.model}</span>?
            <br />
            Это действие нельзя отменить.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3 sm:gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-neutral-200 hover:bg-neutral-100"
            onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="flex-1 bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all duration-200"
            onClick={handleDelete}>
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
