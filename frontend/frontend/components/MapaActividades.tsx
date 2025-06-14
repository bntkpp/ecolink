"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { apiService, type Activity } from "@/lib/api"

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function InteractiveMap() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    // Cargar actividades desde Django
    const loadActivities = async () => {
      const data = await apiService.getAllActivities()
      setActivities(data)
    }
    loadActivities()

    // Cargar Google Maps
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`
      script.async = true
      script.defer = true

      window.initMap = initializeMap
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      const mapElement = document.getElementById("google-map")
      if (!mapElement) return

      const mapInstance = new window.google.maps.Map(mapElement, {
        center: { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile
        zoom: 11,
        styles: [
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#a8e6a3" }],
          },
        ],
      })

      setMap(mapInstance)
      setMapLoaded(true)
    }

    loadGoogleMaps()
  }, [])

  useEffect(() => {
    if (map && activities.length > 0) {
      // Limpiar marcadores existentes
      // Agregar nuevos marcadores
      activities.forEach((activity) => {
        const marker = new window.google.maps.Marker({
          position: { lat: activity.latitud, lng: activity.longitud },
          map: map,
          title: activity.titulo,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getActivityColor(activity.tipo_actividad),
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: 
            `<div class="p-2">
              <h3 class="font-semibold">${activity.titulo}</h3>
              <p class="text-sm text-gray-600">${activity.ubicacion}</p>
              <p class="text-sm">${activity.fecha} - ${activity.hora}</p>
              <p class="text-sm">${activity.inscritos.length} participantes</p>
            </div>`,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      })
    }
  }, [map, activities])

  const getActivityColor = (type: string) => {
    switch (type) {
      case "reforestacion":
        return "#22c55e"
      case "limpieza":
        return "#3b82f6"
      case "educacion":
        return "#eab308"
      case "agricultura":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  return (
    <Card className="h-[500px] overflow-hidden">
      <CardHeader className="bg-green-100 py-2">
        <CardTitle className="flex items-center text-green-800">
          <MapPin className="mr-2 h-5 w-5" />
          Mapa de Actividades Ecológicas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative h-[450px]">
        {!mapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : null}

        <div id="google-map" className="h-full w-full"></div>

        {/* Leyenda */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
          <h4 className="text-sm font-semibold mb-2">Tipos de Actividades</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              Reforestación
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              Limpieza
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              Educación
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              Agricultura
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}