"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Sun, MapPin, AlertTriangle, Clock, Umbrella, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getUVIndex, WeatherData } from "@/utils/weather"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProtectionAdvice {
  icon: React.ReactNode
  title: string
  description: string
}

export function UVIndexWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchUVIndex = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        const data = await getUVIndex(position.coords.latitude, position.coords.longitude)
        setWeatherData(data)
      } catch (err) {
        console.error("Error fetching UV index:", err)
        setError("Unable to fetch UV data. Please enable location access.")
      } finally {
        setLoading(false)
      }
    }

    fetchUVIndex()

    // Refresh UV index every 30 minutes
    const interval = setInterval(fetchUVIndex, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getUVCategory = (index: number) => {
    if (index <= 2) return { category: "Low", color: "text-green-500", bgColor: "bg-green-100" }
    if (index <= 5) return { category: "Moderate", color: "text-yellow-500", bgColor: "bg-yellow-100" }
    if (index <= 7) return { category: "High", color: "text-orange-500", bgColor: "bg-orange-100" }
    if (index <= 10) return { category: "Very High", color: "text-red-500", bgColor: "bg-red-100" }
    return { category: "Extreme", color: "text-purple-500", bgColor: "bg-purple-100" }
  }

  const getProtectionAdvice = (index: number): ProtectionAdvice[] => {
    const baseAdvice = [
      {
        icon: <Clock className="h-5 w-5" />,
        title: "Peak Hours",
        description: "Limit sun exposure between 10am and 4pm"
      },
      {
        icon: <Shield className="h-5 w-5" />,
        title: "Sunscreen",
        description: "Apply SPF 30+ sunscreen every 2 hours"
      },
      {
        icon: <Umbrella className="h-5 w-5" />,
        title: "Protection",
        description: "Wear protective clothing, hat, and sunglasses"
      }
    ]

    if (index <= 2) {
      return baseAdvice.slice(1, 2) // Just sunscreen
    }
    if (index <= 5) {
      return baseAdvice.slice(1) // Sunscreen and protection
    }
    return baseAdvice // All protection measures
  }

  const formatUpdateTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffMinutes < 1) return "Updated just now"
    if (diffMinutes < 60) return `Updated ${diffMinutes}m ago`
    return `Updated ${Math.floor(diffMinutes / 60)}h ago`
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b bg-gradient-to-r from-amber-50 to-yellow-50 px-5 py-4">
        <h3 className="flex items-center gap-2 font-medium text-amber-800">
          <Sun className="h-5 w-5 text-amber-500" />
          Current UV Index
        </h3>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500"></div>
          </div>
        ) : error ? (
          <div className="flex h-32 flex-col items-center justify-center gap-2 text-center">
            <AlertTriangle className="h-10 w-10 text-amber-500" />
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        ) : weatherData ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{weatherData.location}</span>
              </div>
              <div className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600">
                {formatUpdateTime(weatherData.timestamp)}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`flex h-24 w-24 items-center justify-center rounded-full ${
                  getUVCategory(weatherData.uvIndex).bgColor
                }`}
              >
                <span className={`text-4xl font-bold ${getUVCategory(weatherData.uvIndex).color}`}>
                  {weatherData.uvIndex}
                </span>
              </motion.div>

              <div className="flex-1 text-center sm:text-left">
                <h4 className={`mb-1 text-xl font-semibold ${getUVCategory(weatherData.uvIndex).color}`}>
                  {getUVCategory(weatherData.uvIndex).category}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                >
                  {showDetails ? "Hide Protection Advice" : "Show Protection Advice"}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {getProtectionAdvice(weatherData.uvIndex).map((advice, index) => (
                      <div
                        key={index}
                        className="rounded-lg border bg-white p-4 shadow-sm"
                      >
                        <div className="mb-2 flex items-center gap-2 text-amber-600">
                          {advice.icon}
                          <h5 className="font-medium">{advice.title}</h5>
                        </div>
                        <p className="text-sm text-gray-600">{advice.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {weatherData.uvIndex > 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700"
              >
                <p className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    <strong>High UV Alert:</strong> Limit sun exposure between 10am and 4pm. Apply SPF 30+ sunscreen
                    every 2 hours.
                  </span>
                </p>
              </motion.div>
            )}
          </div>
        ) : null}
      </div>
    </Card>
  )
}
