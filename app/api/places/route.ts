import { NextResponse } from 'next/server'

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Missing latitude or longitude' }, { status: 400 })
  }

  try {
    console.log('Fetching nearby places for:', { lat, lng })
    // First, search for dermatologists nearby
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=doctor&keyword=dermatologist&key=${GOOGLE_MAPS_API_KEY}`
    )
    const placesData = await placesResponse.json()
    console.log('Places API response:', placesData)

    if (!placesData.results) {
      console.log('No results found in places data')
      return NextResponse.json({ results: [] })
    }

    // Get detailed information for each place
    const detailedPlaces = await Promise.all(
      placesData.results.map(async (place: any) => {
        console.log('Fetching details for place:', place.place_id)
        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,opening_hours,photos,rating,user_ratings_total,geometry&key=${GOOGLE_MAPS_API_KEY}`
        )
        const detailsData = await detailsResponse.json()
        console.log('Place details response:', detailsData)
        const details = detailsData.result

        // Get photo URL if available
        let photoUrl
        if (details.photos && details.photos.length > 0) {
          photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${details.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
        }

        return {
          id: place.place_id,
          name: details.name,
          address: details.formatted_address,
          location: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
          },
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

    console.log('Final response:', { results: detailedPlaces })
    return NextResponse.json({ results: detailedPlaces })
  } catch (error) {
    console.error('Error fetching places:', error)
    return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 })
  }
} 