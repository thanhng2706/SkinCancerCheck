import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type ABCDEItem = {
  letter: string
  title: string
  description: string
  examples: string[]
  image: string
}

const abcdeItems: ABCDEItem[] = [
  {
    letter: "A",
    title: "Asymmetry",
    description: "One half unlike the other half",
    examples: [
      "One side is raised, the other is flat",
      "One side is darker, the other is lighter",
      "One side has a different texture"
    ],
    image: "/images/asymmetry.png"
  },
  {
    letter: "B",
    title: "Border",
    description: "Irregular, scalloped or poorly defined border",
    examples: [
      "Edges are ragged or notched",
      "Border fades into surrounding skin",
      "Uneven or blurred edges"
    ],
    image: "/images/border.png"
  },
  {
    letter: "C",
    title: "Color",
    description: "Varied from one area to another",
    examples: [
      "Different shades of brown or black",
      "Sometimes white, red, or blue",
      "Multiple colors within the same spot"
    ],
    image: "/images/color.png"
  },
  {
    letter: "D",
    title: "Diameter",
    description: "Larger than 6mm (about 1/4 inch)",
    examples: [
      "Size of a pencil eraser or larger",
      "Growing in size",
      "Any new spot that's larger than others"
    ],
    image: "/images/diameter.png"
  },
  {
    letter: "E",
    title: "Evolving",
    description: "Changing in size, shape, or color",
    examples: [
      "Growing larger",
      "Changing color",
      "Becoming raised or developing symptoms"
    ],
    image: "/images/evolving.png"
  }
]

export function ABCDEInteractive() {
  const [activeItem, setActiveItem] = useState<ABCDEItem>(abcdeItems[0])
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        {abcdeItems.map((item) => (
          <Button
            key={item.letter}
            variant={activeItem.letter === item.letter ? "default" : "outline"}
            className="w-12 h-12 rounded-full text-lg font-bold"
            onClick={() => setActiveItem(item)}
          >
            {item.letter}
          </Button>
        ))}
      </div>

      <motion.div
        key={activeItem.letter}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {activeItem.letter} - {activeItem.title}
              </h3>
              <p className="text-slate-600 mb-4">{activeItem.description}</p>
              <ul className="space-y-2">
                {activeItem.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
              {/* Replace with actual images */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Illustration for {activeItem.title}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full max-w-md"
        >
          {showQuiz ? "Hide Quiz" : "Take ABCDE Quiz"}
        </Button>
      </div>

      {showQuiz && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4"
        >
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Test Your Knowledge</h3>
            {/* Add quiz questions here */}
            <p className="text-slate-600">Quiz feature coming soon!</p>
          </Card>
        </motion.div>
      )}
    </div>
  )
} 