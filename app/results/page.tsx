"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import {
  AnimatedCard,
  AnimatedSection,
  GradientButton,
  BlobBackground,
} from "@/components/ui-components"
import { useRouter } from "next/navigation"

type RiskLevel = "low" | "medium" | "high"

interface AnalysisResult {
  riskLevel: RiskLevel;
  confidence: number;
  prediction?: string;
  warning?: string;
  imageInfo: {
    width: number;
    height: number;
  };
  timestamp: string;
  imageUrl: string;
}

export default function ResultsPage() {
  const router = useRouter()
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [progressValue, setProgressValue] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    const storedResult = localStorage.getItem('lastAnalysis');
    
    if (!storedResult) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const result = JSON.parse(storedResult);
      
      // Validate the required fields
      if (!result.riskLevel || typeof result.confidence !== 'number') {
        throw new Error('Invalid analysis data');
      }

      setAnalysisResult({
        riskLevel: result.riskLevel,
        confidence: result.confidence,
        prediction: result.prediction,
        warning: result.warning,
        imageInfo: result.imageInfo || { width: 0, height: 0 },
        timestamp: result.timestamp || new Date().toISOString(),
        imageUrl: result.imageUrl || ''
      });

      // Clear the stored result after successful retrieval
      localStorage.removeItem('lastAnalysis');
    } catch (err) {
      console.error('Error parsing analysis results:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const getRiskLevel = () => analysisResult?.riskLevel || "low"
  const getConfidence = (): number => {
    if (!analysisResult?.confidence) return 0;
    return Math.round(analysisResult.confidence * 100);
  }
  const getRiskDescription = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return "Low risk of skin cancer"
      case "medium":
        return "Medium risk of skin cancer"
      case "high":
        return "High risk of skin cancer"
      default:
        return ""
    }
  }
  const getRecommendations = (level: RiskLevel) => {
    switch (level) {
      case "low":
        return ["No specific recommendations for low risk"]
      case "medium":
        return ["Consider regular monitoring", "Consult a dermatologist"]
      case "high":
        return ["Immediate medical attention", "Consult a dermatologist"]
      default:
        return []
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      <BlobBackground />

      <header className="border-b backdrop-blur-sm bg-white/70 sticky top-0 z-10">
        <div className="container flex items-center py-4">
          <Link href="/scan" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold gradient-text">SkinCancerCheck</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <AnimatedSection className="max-w-md mx-auto">
          <motion.h2
            className="text-2xl font-bold mb-6 text-center gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Results
          </motion.h2>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnimatedCard glassmorphism className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="relative mx-auto w-20 h-20">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-teal-100"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <div className="relative z-10 flex items-center justify-center h-full">
                        <Shield className="h-10 w-10 text-teal-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Finalizing Analysis</h3>
                      <p className="text-sm text-slate-500 mb-4">Processing your results...</p>
                      <Progress value={progressValue} className="h-2 bg-slate-100" />
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ) : analysisResult ? (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <AnimatedCard glassmorphism className={`p-6 ${getRiskBgColor(getRiskLevel())}`}>
                  <div className="flex items-center gap-4">
                    {getRiskIcon(getRiskLevel())}
                    <div>
                      <h3 className={`text-lg font-medium ${getRiskColor(getRiskLevel())}`}>
                        {getRiskLevel().charAt(0).toUpperCase() + getRiskLevel().slice(1)} Risk Level
                      </h3>
                      <p className="text-sm text-slate-600">{getRiskDescription(getRiskLevel())}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Confidence Score</span>
                      <span>{Math.round(getConfidence())}%</span>
                    </div>
                    <Progress value={getConfidence()} className="h-2" />
                  </div>
                  
                  {analysisResult?.warning && (
                    <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">{analysisResult.warning}</p>
                      </div>
                    </div>
                  )}
                </AnimatedCard>

                <AnimatedCard delay={0.3} glassmorphism className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Info className="mr-2 h-5 w-5 text-teal-600" />
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {getRecommendations(getRiskLevel()).map((rec: string, index: number) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1 flex-shrink-0">
                          <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        </div>
                        <p className="text-slate-700">{rec}</p>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatedCard>

                <div className="pt-4 flex justify-center">
                  <Link href="/scan">
                    <GradientButton className="rounded-full">
                      Scan Another Area
                    </GradientButton>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnimatedCard glassmorphism className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Analysis Error</h3>
                  <p className="text-slate-600 mb-4">Unable to process results. Please try again.</p>
                  <Link href="/scan" className="inline-block">
                    <GradientButton className="rounded-full">Try Again</GradientButton>
                  </Link>
                </AnimatedCard>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedSection>
      </main>

      <footer className="border-t py-4 backdrop-blur-sm bg-white/70">
        <div className="container text-center text-sm text-slate-500">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            This is not a medical diagnosis. Always consult with your healthcare provider.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
