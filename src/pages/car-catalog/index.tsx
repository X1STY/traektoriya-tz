import { useMemo, useState } from 'react'
import { Package } from 'lucide-react'
import { useGetCarsPresenter } from '@/entities/case/car/get-list/presenter'
import { applySort, useCarStore } from '@/entities/store/car'
import { AddCarModal, CarGrid, DeleteCarModal, SortControl, UpdateCarModal } from '@/widgets/car-catalog'
import { MapView } from '@/widgets/map'
import type { ICarDto } from '@/shared/interface/car'

const CarCatalogPage = () => {
  const { isLoading } = useGetCarsPresenter()
  const cars = useCarStore((s) => s.cars)
  const { sortBy, sortOrder, toggleSortOrder, setSortBy } = useCarStore()

  const filteredCars = useMemo(() => applySort(cars, sortBy, sortOrder), [cars, sortBy, sortOrder])
  const [editingCar, setEditingCar] = useState<ICarDto | null>(null)
  const [deletingCar, setDeletingCar] = useState<ICarDto | null>(null)
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null)

  const handleEdit = (car: ICarDto) => setEditingCar(car)
  const handleDelete = (car: ICarDto) => setDeletingCar(car)
  const handleMarkerClick = (car: ICarDto) => setSelectedCarId(car.id)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900">
                <Package className="h-5 w-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="font-serif text-lg tracking-tight">Автокаталог</h1>
                <p className="text-xs text-muted-foreground">Найдите свой идеальный автомобиль</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">Коллекция автомобилей</h2>
            <p className="mt-2 text-muted-foreground">Премиальные автомобили с историей и характером</p>
          </div>
          <AddCarModal />
        </div>

        <SortControl
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByChange={setSortBy}
          onSortOrderToggle={toggleSortOrder}
          totalResults={filteredCars.length}
          className="mb-6"
        />

        <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-8">
          <div className="lg:sticky lg:top-24 lg:self-start order-1 lg:order-1">
            <MapView cars={filteredCars} selectedCarId={selectedCarId} onMarkerClick={handleMarkerClick} />
          </div>
          <div className="order-2 lg:order-2">
            <CarGrid cars={filteredCars} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>

        <UpdateCarModal open={!!editingCar} onOpenChange={(open) => !open && setEditingCar(null)} car={editingCar} />
        <DeleteCarModal open={!!deletingCar} onOpenChange={(open) => !open && setDeletingCar(null)} car={deletingCar} />
      </main>
    </div>
  )
}

export default CarCatalogPage
