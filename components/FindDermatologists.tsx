import { useState, useEffect } from "react"
import { MapPin, Phone, Globe, Star, Navigation, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface DermatologistInfo {
  id: string
  name: string
  address: string
  distance: number
  rating: number
  totalRatings: number
  phone?: string
  website?: string
  openNow?: boolean
  openingHours?: string[]
  photoUrl?: string
  location: {
    lat: number
    lng: number
  }
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

async function findNearbyDermatologists(lat: number, lng: number): Promise<DermatologistInfo[]> {
  console.log('Fetching dermatologists for:', { lat, lng })
  const response = await fetch(`/api/places?lat=${lat}&lng=${lng}`)
  const data = await response.json()
  
  if (!response.ok) {
    console.error('API error:', data)
    throw new Error(data.error || 'Failed to fetch dermatologists')
  }

  console.log('API response:', data)
  
  if (!data.results || !Array.isArray(data.results)) {
    console.warn('No results found or invalid response format')
    return []
  }
  
  // Calculate distances and sort
  const dermatologists = data.results.map((place: DermatologistInfo) => ({
    ...place,
    distance: Number(calculateDistance(lat, lng, place.location.lat, place.location.lng).toFixed(1))
  }))

  console.log('Processed results:', dermatologists)
  return dermatologists.sort((a: DermatologistInfo, b: DermatologistInfo) => a.distance - b.distance)
}

const RESULTS_PER_PAGE = 5 // Show 5 results initially

export function FindDermatologists() {
  const [dermatologists, setDermatologists] = useState<DermatologistInfo[]>([])
  const [displayCount, setDisplayCount] = useState(RESULTS_PER_PAGE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const displayedDermatologists = dermatologists.slice(0, displayCount)
  const hasMore = displayCount < dermatologists.length

  const handleShowMore = () => {
    setDisplayCount(prev => prev + RESULTS_PER_PAGE)
  }

  const fetchDermatologists = async () => {
    if (!userLocation) {
      console.warn('No user location available')
      return
    }
    
    setLoading(true)
    try {
      console.log('Fetching dermatologists...')
      const results = await findNearbyDermatologists(userLocation.lat, userLocation.lng)
      console.log('Fetch results:', results)
      setDermatologists(results)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dermatologists'
      console.error('Error fetching dermatologists:', err)
      setError(errorMessage)
      setDermatologists([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getLocation = async () => {
      try {
        console.log('Getting user location...')
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log('User location:', location)
        setUserLocation(location)
      } catch (err) {
        console.error('Location error:', err)
        setError("Unable to find dermatologists. Please enable location access.")
        setLoading(false)
      }
    }

    getLocation()
  }, [])

  useEffect(() => {
    if (userLocation) {
      console.log('User location updated, fetching dermatologists...')
      fetchDermatologists()
    }
  }, [userLocation])

  const getDirectionsUrl = (address: string) => {
    if (!userLocation) return "#"
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  }

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Nearby Dermatologists</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6 last:mb-0">
            <Skeleton className="h-32 rounded-lg mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          <MapPin className="h-12 w-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="divide-y">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Nearby Dermatologists</h3>
            <p className="text-sm text-slate-500">
              Showing {displayedDermatologists.length} of {dermatologists.length} results
            </p>
          </div>
          
          <div className="space-y-6">
            <AnimatePresence>
              {displayedDermatologists.map((dermatologist) => (
                <motion.div
                  key={dermatologist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {dermatologist.photoUrl ? (
                        <div className="w-20 h-20 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${dermatologist.photoUrl})` }} />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-slate-100 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-slate-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{dermatologist.name}</h4>
                          <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                            <MapPin className="h-4 w-4" />
                            <span>{dermatologist.address}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{dermatologist.rating}</span>
                            <span className="text-slate-400">({dermatologist.totalRatings})</span>
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            {dermatologist.distance} miles away
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4">
                        {dermatologist.phone && (
                          <a
                            href={`tel:${dermatologist.phone}`}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Phone className="h-4 w-4" />
                            {dermatologist.phone}
                          </a>
                        )}
                        
                        {dermatologist.website && (
                          <a
                            href={dermatologist.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Globe className="h-4 w-4" />
                            Website
                          </a>
                        )}

                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          <span className={dermatologist.openNow ? "text-green-600" : "text-red-600"}>
                            {dermatologist.openNow ? "Open Now" : "Closed"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm"
                          onClick={() => window.open(getDirectionsUrl(dermatologist.address), "_blank")}
                        >
                          <Navigation className="h-4 w-4 mr-1" />
                          Get Directions
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm"
                          onClick={() => {/* Add booking functionality */}}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </div>

                  {dermatologist.openingHours && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm text-slate-500">
                        <h5 className="font-medium text-slate-700 mb-1">Opening Hours</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {dermatologist.openingHours.map((hours, index) => (
                            <div key={index}>{hours}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-6"
              >
                <Button
                  variant="outline"
                  onClick={handleShowMore}
                  className="w-full sm:w-auto"
                >
                  Show More Results
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="p-6 bg-slate-50">
          <p className="text-sm text-slate-500 text-center">
            Showing dermatologists within 5 miles of your location. 
            <button 
              className="text-blue-600 hover:text-blue-800 ml-1" 
              onClick={() => {
                setDisplayCount(RESULTS_PER_PAGE)
                fetchDermatologists()
              }}
            >
              Refresh results
            </button>
          </p>
        </div>
      </Card>
    </motion.div>
  )
} 