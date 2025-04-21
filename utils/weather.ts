const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export interface WeatherData {
  uvIndex: number
  location: string
  timestamp: number
}

export async function getUVIndex(lat: number, lon: number): Promise<WeatherData> {
  try {
    if (!OPENWEATHER_API_KEY) {
      throw new Error('OpenWeather API key not found in environment variables')
    }

    // Check if API is activated by making a test call
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    )
    
    if (weatherResponse.status === 401) {
      console.log('API key not activated yet, using fallback calculation')
      // Fallback to time-based estimation until API is activated
      const now = new Date()
      const hour = now.getHours()
      
      // Simple UV estimation based on time of day
      let estimatedUV = 0
      if (hour >= 10 && hour <= 16) { // Peak UV hours
        estimatedUV = 7 // High
      } else if ((hour >= 7 && hour < 10) || (hour > 16 && hour <= 19)) { // Morning/Evening
        estimatedUV = 4 // Moderate
      }

      return {
        uvIndex: estimatedUV,
        location: "Current Location",
        timestamp: Math.floor(Date.now() / 1000)
      }
    }

    if (!weatherResponse.ok) {
      throw new Error(`Weather API request failed: ${weatherResponse.status}`)
    }
    
    const weatherData = await weatherResponse.json()

    // For the free tier, we'll estimate UV index based on time of day and cloud cover
    const now = new Date()
    const hour = now.getHours()
    const cloudCover = weatherData.clouds?.all || 0 // percentage of cloud cover

    // Calculate estimated UV index
    let estimatedUV = 0
    if (hour >= 10 && hour <= 16) { // Peak UV hours
      const baseUV = 10 // Maximum UV on a clear day
      estimatedUV = Math.round(baseUV * (1 - cloudCover/100)) // Reduce UV based on cloud cover
    } else if ((hour >= 7 && hour < 10) || (hour > 16 && hour <= 19)) { // Morning/Evening
      const baseUV = 5
      estimatedUV = Math.round(baseUV * (1 - cloudCover/100))
    }

    // Ensure UV index is within valid range
    estimatedUV = Math.max(0, Math.min(11, estimatedUV))

    return {
      uvIndex: estimatedUV,
      location: weatherData.name || 'Current Location',
      timestamp: weatherData.dt
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    // Fallback to basic time-based estimation if API fails
    const now = new Date()
    const hour = now.getHours()
    
    let estimatedUV = 0
    if (hour >= 10 && hour <= 16) {
      estimatedUV = 7
    } else if ((hour >= 7 && hour < 10) || (hour > 16 && hour <= 19)) {
      estimatedUV = 4
    }

    return {
      uvIndex: estimatedUV,
      location: "Current Location",
      timestamp: Math.floor(Date.now() / 1000)
    }
  }
} 