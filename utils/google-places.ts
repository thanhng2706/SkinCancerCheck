import { DermatologistInfo } from "@/types/dermatologist"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export async function findNearbyDermatologists(
  lat: number,
  lng: number,
  radius: number = 5000 // 5km radius
): Promise<DermatologistInfo[]> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("Google Maps API key is not configured")
  }

  try {
    // First, search for dermatologists nearby
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=doctor&keyword=dermatologist&key=${GOOGLE_MAPS_API_KEY}`
    )
    const placesData = await placesResponse.json()

    if (!placesData.results) {
      return []
    }

    // Get detailed information for each place
    const detailedPlaces = await Promise.all(
      placesData.results.map(async (place: any) => {
        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,photos,rating,user_ratings_total,geometry&key=${GOOGLE_MAPS_API_KEY}`
        )
        const detailsData = await detailsResponse.json()
        const details = detailsData.result

        // Calculate distance
        const distance = calculateDistance(
          lat,
          lng,
          place.geometry.location.lat,
          place.geometry.location.lng
        )

        // Get photo URL if available
        let photoUrl
        if (details.photos && details.photos.length > 0) {
          photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${details.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
        }

        return {
          id: place.place_id,
          name: details.name,
          address: details.formatted_address,
          distance: Number(distance.toFixed(1)),
          rating: details.rating || 0,
          totalRatings: details.user_ratings_total || 0,
          phone: details.formatted_phone_number,
          website: details.website,
          openNow: details.opening_hours?.open_now || false,
          openingHours: details.opening_hours?.weekday_text || [],
          photoUrl
        }
      })
    )

    // Sort by distance
    return detailedPlaces.sort((a, b) => a.distance - b.distance)
  } catch (error) {
    console.error("Error fetching dermatologists:", error)
    throw error
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