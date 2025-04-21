"use client"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface Step {
  path: string
  label: string
}

export function ProgressIndicator() {
  const pathname = usePathname()

  const steps: Step[] = [
    { path: "/", label: "Home" },
    { path: "/scan", label: "Scan" },
    { path: "/results", label: "Results" },
  ]

  const currentStepIndex = steps.findIndex((step) => step.path === pathname)

  if (currentStepIndex === -1) return null

  const progress = (currentStepIndex / (steps.length - 1)) * 100

  return (
    <div className="relative h-1 w-full bg-gray-100">
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal-500 to-cyan-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute -top-1 flex w-full justify-between px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative flex h-3 w-3 items-center justify-center rounded-full ${
              index <= currentStepIndex ? "bg-teal-500" : "bg-gray-300"
            }`}
          >
            {index <= currentStepIndex && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                transition={{ duration: 0.5, repeat: 1, repeatType: "reverse" }}
                className="absolute h-3 w-3 rounded-full bg-teal-500/30"
              />
            )}
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-500">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
