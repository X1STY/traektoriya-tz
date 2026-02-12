import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { ICarDto } from '@/shared/interface/car'
import { CarPopup } from '../car-popup'
import { cn } from '@/shared/lib/utils.ts'
import 'leaflet/dist/leaflet.css'

// Fix default marker icon issue with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapBoundsProps {
  cars: ICarDto[]
}

const MapBounds = ({ cars }: MapBoundsProps) => {
  const map = useMap()
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Only fit bounds on initial mount
    if (hasInitialized.current || cars.length === 0) return

    const bounds = L.latLngBounds(
      cars.map((car) => [car.latitude, car.longitude] as L.LatLngExpression)
    )
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
    hasInitialized.current = true
  }, [cars, map])

  return null
}

// Custom marker icon for selected/unselected states
const createMarkerIcon = (isSelected: boolean): L.DivIcon => {
  const color = isSelected ? '#2563eb' : '#ef4444'
  const size = isSelected ? 36 : 30

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="${size}" height="${size + 10}" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 22 12 22s12-13 12-22c0-6.63-5.37-12-12-12z" fill="${color}"/>
        <circle cx="12" cy="12" r="6" fill="white"/>
      </svg>
    `,
    iconSize: [size, size + 10],
    iconAnchor: [size / 2, size + 10],
    popupAnchor: [0, -(size + 10)],
  })
}

interface MapViewProps {
  cars: ICarDto[]
  selectedCarId?: number | null
  onMarkerClick?: (car: ICarDto) => void
  className?: string
}

export const MapView = ({ cars, selectedCarId, onMarkerClick, className }: MapViewProps) => {
  const defaultCenter: L.LatLngExpression = [55.7558, 37.6173] // Moscow

  return (
    <div className={cn('relative min-h-[400px] w-full rounded-xl overflow-hidden shadow-sm border border-border', className)}>
      <MapContainer
        center={defaultCenter}
        zoom={10}
        className="h-full w-full min-h-[400px]"
        zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBounds cars={cars} />

        {cars.map((car) => (
          <Marker
            key={car.id}
            position={[car.latitude, car.longitude]}
            icon={createMarkerIcon(car.id === selectedCarId)}
            eventHandlers={{
              click: () => onMarkerClick?.(car),
            }}>
            <Popup
              className="custom-popup"
              closeButton={false}
              minWidth={200}
              maxWidth={300}>
              <CarPopup car={car} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
