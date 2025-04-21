"use client"

import { useState, useEffect } from "react"
import { X, Camera, Sun, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface PhotoTipsOverlayProps {
  onClose: () => void
}

export function PhotoTipsOverlay({ onClose }: PhotoTipsOverlayProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [showDontShowAgain, setShowDontShowAgain] = useState(false)

  const tips = [
    {
      title: "Good Lighting",
      description: "Use natural daylight or bright, even lighting to capture clear images.",
      icon: <Sun className="h-10 w-10 text-amber-500" />,
    },
    {
      title: "Proper Distance",
      description: "Hold your device 6-8 inches away from the skin for optimal focus.",
      icon: <Camera className="h-10 w-10 text-teal-500" />,
    },
    {
      title: "Steady Hand",
      description: "Keep your hand steady and use a surface for support if needed.",
      icon: <Info className="h-10 w-10 text-blue-500" />,
    },
  ]

  useEffect(() => {
    // Check if user has seen the tips before
    const hasSeenTips = localStorage.getItem("hasSeenPhotoTips")
    if (hasSeenTips === "true") {
      onClose()
    } else {
      setShowDontShowAgain(true)
    }
  }, [onClose])

  const handleNext = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1)
    } else {
      handleClose()
    }
  }

  const handleDontShowAgain = () => {
    localStorage.setItem("hasSeenPhotoTips", "true")
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative mx-4 max-w-sm rounded-xl bg-white p-6 shadow-xl"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close tips"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-gray-900">Photo Tips</h3>
          <p className="text-sm text-gray-500">Follow these tips for the best analysis results</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-6 flex flex-col items-center"
          >
            <div className="mb-4 rounded-full bg-gray-100 p-4">{tips[currentTip].icon}</div>
            <h4 className="mb-2 text-lg font-semibold text-gray-900">{tips[currentTip].title}</h4>
            <p className="text-center text-gray-600">{tips[currentTip].description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          {showDontShowAgain && (
            <Button variant="ghost" size="sm" onClick={handleDontShowAgain}>
              Don&apos;t show again
            </Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <div className="flex gap-1">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentTip ? "bg-teal-500" : "bg-gray-200"}`}
                />
              ))}
            </div>
            <Button onClick={handleNext}>{currentTip < tips.length - 1 ? "Next" : "Got it"}</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
