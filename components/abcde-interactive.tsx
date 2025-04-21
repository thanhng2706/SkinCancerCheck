"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info } from "lucide-react"

interface ABCDERule {
  letter: string
  title: string
  description: string
  example: string
}

const abcdeRules: ABCDERule[] = [
  {
    letter: "A",
    title: "Asymmetry",
    description: "One half of the mole doesn't match the other half",
    example: "asymmetrical-mole",
  },
  {
    letter: "B",
    title: "Border",
    description: "Edges are irregular, blurred, or notched",
    example: "irregular-border",
  },
  {
    letter: "C",
    title: "Color",
    description: "Color varies throughout the mole",
    example: "varied-color",
  },
  {
    letter: "D",
    title: "Diameter",
    description: "Larger than 6mm (pencil eraser size)",
    example: "large-diameter",
  },
  {
    letter: "E",
    title: "Evolution",
    description: "Changes in size, shape, color, or symptoms",
    example: "evolving-mole",
  },
]

export function ABCDEInteractive() {
  const [activeRule, setActiveRule] = useState<string | null>(null)

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Info className="h-5 w-5 text-teal-600" />
        <h3 className="text-lg font-semibold">The ABCDE Rule for Skin Cancer</h3>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Click on each letter to learn more about the warning signs of melanoma.
      </p>

      <div className="mb-8 flex flex-wrap justify-center gap-4 sm:gap-6">
        {abcdeRules.map((rule) => (
          <motion.button
            key={rule.letter}
            className={`relative flex h-16 w-16 flex-col items-center justify-center rounded-xl text-lg font-bold transition-all duration-200 sm:h-20 sm:w-20 ${
              activeRule === rule.letter
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveRule(activeRule === rule.letter ? null : rule.letter)}
            aria-label={`${rule.title} - ${rule.description}`}
          >
            <span className="text-xl sm:text-2xl">{rule.letter}</span>
            {activeRule !== rule.letter && (
              <span className="mt-1 text-xs font-normal text-slate-500 sm:text-sm">{rule.title}</span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeRule && (
          <motion.div
            key={activeRule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 rounded-lg bg-slate-50 p-4"
          >
            {abcdeRules
              .filter((rule) => rule.letter === activeRule)
              .map((rule) => (
                <div key={rule.letter} className="flex flex-col sm:flex-row sm:gap-6">
                  <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg bg-white p-2 shadow-sm sm:mb-0 sm:w-1/3">
                    <div className="relative h-full w-full overflow-hidden rounded-md bg-slate-100">
                      {/* This would be a real image in a production app */}
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        Example image for {rule.title}
                      </div>
                    </div>
                  </div>
                  <div className="sm:w-2/3">
                    <h4 className="mb-2 text-xl font-bold text-teal-700">{rule.title}</h4>
                    <p className="mb-3 text-slate-700">{rule.description}</p>
                    <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                      <strong>What to look for:</strong> Moles that are asymmetrical, have irregular borders, show
                      multiple colors, are larger than 6mm, or change over time should be evaluated by a dermatologist.
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
