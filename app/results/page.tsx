"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle, Info, ArrowRight, Shield, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedCard, AnimatedSection, GradientButton, BlobBackground } from "@/components/ui-components"
import { ShareWithDoctor } from "@/components/share-with-doctor"
import { ABCDEInteractive } from "@/components/abcde-interactive"
import { FloatingActionButton } from "@/components/floating-action-button"
import { ProgressIndicator } from "@/components/progress-indicator"
import { SaveResultsPdf } from "@/components/SaveResultsPdf"
import { ReminderButton } from "@/components/reminder-button"
import { UVIndexWidget } from "@/components/uv-index-widget"
import { useRouter } from "next/navigation"
import { FindDermatologists } from "@/components/FindDermatologists"

type RiskLevel = "low" | "medium" | "high"

interface AnalysisResult {
  condition: string
  confidence: number
  timestamp: string
  imageUrl?: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [riskLevel, setRiskLevel] = useState<RiskLevel | null>(null)
  const [loading, setLoading] = useState(true)
  const [progressValue, setProgressValue] = useState(0)
  const [showDermatologists, setShowDermatologists] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    // Get the analysis result from sessionStorage
    const imageData = sessionStorage.getItem("capturedImage")
    const resultData = sessionStorage.getItem("analysisResult")
    
    if (!imageData || !resultData) {
      router.push("/scan")
      return
    }

    try {
      const result = JSON.parse(resultData)
      setAnalysisResult(result)
      
      // Determine risk level based on condition and confidence
      let risk: RiskLevel = "low"
      if (result.condition === "Melanoma" || result.condition === "Basal cell carcinoma") {
        risk = "high"
      } else if (result.condition === "Actinic keratoses and intraepithelial carcinomae") {
        risk = "medium"
      }
      
      // Simulate progress animation
      const progressInterval = setInterval(() => {
        setProgressValue((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 5
        })
      }, 100)

      // Set final results
      setTimeout(() => {
        setRiskLevel(risk)
        setLoading(false)
      }, 2000)

      return () => clearInterval(progressInterval)
    } catch (err) {
      console.error("Error parsing analysis result:", err)
      setLoading(false)
    }
  }, [])

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-amber-600"
      case "high":
        return "text-red-600"
      default:
        return ""
    }
  }

  const getRiskBgColor = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return "bg-green-100"
      case "medium":
        return "bg-amber-100"
      case "high":
        return "bg-red-100"
      default:
        return ""
    }
  }

  const getRiskGradient = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return "from-green-500 to-emerald-500"
      case "medium":
        return "from-amber-500 to-yellow-500"
      case "high":
        return "from-red-500 to-rose-500"
      default:
        return ""
    }
  }

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-8 w-8 text-green-600" />
      case "medium":
        return <AlertTriangle className="h-8 w-8 text-amber-600" />
      case "high":
        return <AlertTriangle className="h-8 w-8 text-red-600" />
      default:
        return null
    }
  }

  const getRiskDescription = (level: RiskLevel) => {
    if (!analysisResult) return ""
    
    const confidence = (analysisResult.confidence * 100).toFixed(1)
    switch (level) {
      case "low":
        return `No significant signs of skin cancer detected (${confidence}% confidence). The analysis indicates ${analysisResult.condition}. Continue monitoring your skin for any changes.`
      case "medium":
        return `Some potential signs of skin cancer detected (${confidence}% confidence). The analysis indicates ${analysisResult.condition}. We recommend consulting with a dermatologist for further evaluation.`
      case "high":
        return `Strong indicators of potential skin cancer detected (${confidence}% confidence). The analysis indicates ${analysisResult.condition}. We strongly recommend consulting with a dermatologist as soon as possible.`
      default:
        return ""
    }
  }

  const getRecommendations = (level: RiskLevel) => {
    const commonRecommendations = [
      "Use broad-spectrum sunscreen with SPF 30 or higher",
      "Wear protective clothing and hats when outdoors",
      "Avoid tanning beds and excessive sun exposure",
    ]

    switch (level) {
      case "low":
        return [...commonRecommendations, "Continue monthly skin self-examinations"]
      case "medium":
        return [
          ...commonRecommendations,
          "Schedule an appointment with a dermatologist within the next month",
          "Take photos of the area to monitor for changes",
        ]
      case "high":
        return [
          ...commonRecommendations,
          "Schedule an appointment with a dermatologist as soon as possible",
          "Avoid sun exposure to the affected area",
          "Follow the ABCDE rule to monitor changes (Asymmetry, Border, Color, Diameter, Evolution)",
        ]
      default:
        return commonRecommendations
    }
  }

  const getRiskProgressValue = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return 25
      case "medium":
        return 60
      case "high":
        return 90
      default:
        return 0
    }
  }

  const findNearbyDermatologists = () => {
    setShowDermatologists(true)

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden relative">
      <BlobBackground />

      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur-sm">
        <div className="container flex items-center py-4">
          <Link href="/scan" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold gradient-text">SkinCancerCheck</h1>
          </Link>
        </div>
        <ProgressIndicator />
      </header>

      <main className="container flex-1 py-8">
        <AnimatedSection>
          <motion.h2
            className="mb-8 text-center text-2xl font-bold gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Results
          </motion.h2>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnimatedCard glassmorphism className="mx-auto max-w-md p-8 text-center">
                  <div className="space-y-6">
                    <div className="relative mx-auto h-20 w-20">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-teal-100"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <div className="relative z-10 flex h-full items-center justify-center">
                        <Shield className="h-10 w-10 text-teal-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Finalizing Analysis</h3>
                      <p className="mb-4 text-sm text-slate-500">Processing your results...</p>
                      <div className="flex justify-center">
                        <Progress value={progressValue} className="w-[60%]" />
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ) : riskLevel ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto max-w-5xl"
              >
                <div className="mb-8">
                  <AnimatedCard glassmorphism className="mx-auto max-w-2xl p-8">
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className={`mb-4 rounded-full p-5 ${getRiskBgColor(riskLevel)}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        {getRiskIcon(riskLevel)}
                      </motion.div>
                      <motion.h3
                        className={`mb-2 text-3xl font-bold ${getRiskColor(riskLevel)}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {riskLevel === "low" ? "Low Risk" : riskLevel === "medium" ? "Medium Risk" : "High Risk"}
                      </motion.h3>

                      <div className="relative mx-auto my-6 w-[60%]">
                        <div className="absolute -top-5 left-0 text-xs text-slate-400">Low</div>
                        <div className="absolute -top-5 right-0 text-xs text-slate-400">High</div>
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }}>
                          <Progress
                            value={getRiskProgressValue(riskLevel)}
                            className={`h-3 rounded-full bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:${getRiskGradient(riskLevel)} [&>div]:rounded-full`}
                          />
                        </motion.div>
                      </div>

                      <motion.p
                        className="max-w-lg text-lg text-slate-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {getRiskDescription(riskLevel)}
                      </motion.p>
                    </div>
                  </AnimatedCard>
                </div>

                <div className="mb-8">
                  <AnimatedCard delay={0.3} glassmorphism className="mx-auto max-w-2xl p-8">
                    <h3 className="mb-6 flex items-center text-xl font-semibold">
                      <Info className="mr-3 h-6 w-6 text-teal-600" />
                      Recommendations
                    </h3>
                    <ul className="space-y-4">
                      {getRecommendations(riskLevel).map((rec, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <div className="mt-1 flex-shrink-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-1">
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                          </div>
                          <p className="text-lg text-slate-700">{rec}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </AnimatedCard>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-8">
                    <ABCDEInteractive />
                    <UVIndexWidget />
                  </div>

                  <div className="space-y-8">
                    <AnimatedCard delay={0.5} className="p-8 bg-white shadow-sm">
                      <h3 className="mb-6 text-xl font-semibold">Actions</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="col-span-2">
                          {analysisResult && <SaveResultsPdf analysisResult={analysisResult} />}
                        </div>

                        <ReminderButton />

                        <Button
                          variant="outline"
                          className="flex items-center gap-2 rounded-full"
                          onClick={findNearbyDermatologists}
                        >
                          <MapPin className="h-4 w-4" />
                          Find Dermatologists
                        </Button>

                        <div className="col-span-2">
                          <ShareWithDoctor riskLevel={riskLevel} />
                        </div>
                      </div>
                    </AnimatedCard>

                    {showDermatologists && (
                      <FindDermatologists />
                    )}
                  </div>
                </div>

                <motion.div
                  className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/scan">
                    <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto px-8">
                      New Scan
                    </Button>
                  </Link>

                  <Link href="/about">
                    <GradientButton size="lg" className="rounded-full w-full sm:w-auto px-8">
                      Learn More <ArrowRight className="ml-2 h-5 w-5" />
                    </GradientButton>
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnimatedCard glassmorphism className="mx-auto max-w-md p-8 text-center">
                  <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-amber-500" />
                  <h3 className="mb-3 text-xl font-medium">Analysis Error</h3>
                  <p className="mb-6 text-slate-600">Unable to process results. Please try again.</p>
                  <Link href="/scan" className="inline-block">
                    <GradientButton size="lg" className="rounded-full">
                      Try Again
                    </GradientButton>
                  </Link>
                </AnimatedCard>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedSection>
      </main>

      <footer className="border-t py-6 bg-white/70 backdrop-blur-sm">
        <div className="container text-center">
          <motion.p
            className="text-slate-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            This is not a medical diagnosis. Always consult with your healthcare provider.
          </motion.p>
        </div>
      </footer>

      <FloatingActionButton />
    </div>
  )
}
