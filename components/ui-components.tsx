"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"

// Animated Card Component
interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
  delay?: number
  className?: string
  glassmorphism?: boolean
  gradient?: boolean
}

export function AnimatedCard({
  children,
  delay = 0,
  className,
  glassmorphism = false,
  gradient = false,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "rounded-xl p-6 shadow-lg",
        glassmorphism && "glass-card",
        gradient && "gradient-border",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Animated Section Component
interface AnimatedSectionProps extends Omit<HTMLMotionProps<"section">, "children"> {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimatedSection({ children, delay = 0, className, ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}

// Animated Icon Component
interface AnimatedIconProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
  delay?: number
  className?: string
  animation?: "pulse" | "float" | "none"
}

export function AnimatedIcon({ children, delay = 0, className, animation = "pulse", ...props }: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "flex items-center justify-center",
        animation === "pulse" && "animate-pulse-slow",
        animation === "float" && "animate-float",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Gradient Button Component
const gradientButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface GradientButtonProps
  extends Omit<HTMLMotionProps<"button">, keyof VariantProps<typeof gradientButtonVariants>>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <motion.button
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      />
    )
  },
)
GradientButton.displayName = "GradientButton"

// Animated Text Component
interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  className?: string
  gradient?: boolean
  delay?: number
}

export function AnimatedText({ text, className, gradient = false, delay = 0, ...props }: AnimatedTextProps) {
  const words = text.split(" ")

  return (
    <div className={cn("inline-block", className)} {...props}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={cn("inline-block mr-1", gradient && "gradient-text")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.1 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// Blob Background Component
export function BlobBackground() {
  return (
    <>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
    </>
  )
}

// Camera Frame Component
export function CameraFrame({ className }: { className?: string }) {
  return (
    <div className={cn("camera-grid relative rounded-lg overflow-hidden", className)}>
      <div className="camera-target w-full h-full"></div>
      <div className="scan-line"></div>
    </div>
  )
}
