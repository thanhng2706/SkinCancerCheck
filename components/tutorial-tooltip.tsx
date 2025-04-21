"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle } from "lucide-react"

interface TutorialTooltipProps {
  id: string
  title: string
  content: string
  position?: "top" | "bottom" | "left" | "right"
}

export function TutorialTooltip({ id, title, content, position = "bottom" }: TutorialTooltipProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check if this tooltip has been seen before
    const seenTutorials = JSON.parse(localStorage.getItem("seenTutorials") || "{}")

    if (!seenTutorials[id]) {
      // Show the tooltip after a short delay
      const timer = setTimeout(() => {
        setVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [id])

  const handleDismiss = () => {
    setVisible(false)

    // Mark this tooltip as seen
    const seenTutorials = JSON.parse(localStorage.getItem("seenTutorials") || "{}")
    seenTutorials[id] = true
    localStorage.setItem("seenTutorials", JSON.stringify(seenTutorials))
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setVisible(!visible)}
        className="rounded-full bg-teal-500 p-1.5 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        aria-label="Help"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 w-64 rounded-md bg-teal-500 p-3 text-white shadow-lg"
            style={{
              top: position === "top" ? "auto" : "calc(100% + 8px)",
              bottom: position === "top" ? "calc(100% + 8px)" : "auto",
              left: "50%",
              transform: "translateX(-50%)",
              maxWidth: "calc(100vw - 32px)",
            }}
          >
            {/* Arrow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 border-8 border-solid border-transparent"
              style={{
                top: position === "top" ? "100%" : "auto",
                bottom: position === "top" ? "auto" : "100%",
                borderTopColor: position === "top" ? "rgb(20 184 166)" : "transparent",
                borderBottomColor: position === "top" ? "transparent" : "rgb(20 184 166)",
              }}
            />
            <div className="mb-1 font-semibold">{title}</div>
            <p className="text-sm">{content}</p>
            <button
              onClick={handleDismiss}
              className="mt-2 w-full rounded bg-white/20 px-2 py-1 text-xs font-medium hover:bg-white/30"
            >
              Got it
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
