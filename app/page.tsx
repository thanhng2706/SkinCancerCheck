"use client"

import Link from "next/link"
import { ArrowRight, Camera, Shield, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  AnimatedCard,
  AnimatedSection,
  AnimatedIcon,
  GradientButton,
  AnimatedText,
  BlobBackground,
} from "@/components/ui-components"
import { FloatingActionButton } from "@/components/floating-action-button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      <BlobBackground />

      <header className="border-b backdrop-blur-sm bg-white/70 sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-1.5 rounded-md">
              <Camera size={20} />
            </div>
            <h1 className="text-xl font-bold gradient-text">SkinCancerCheck</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/about">
              <Button variant="ghost" size="sm" className="rounded-full">
                About
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      <main className="flex-1">
        <AnimatedSection className="container py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-6 md:space-y-0 mb-12">
            <div className="md:w-1/2 space-y-6">
              <div className="flex flex-col items-center md:items-start">
                <AnimatedIcon
                  animation="float"
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 rounded-full text-white"
                >
                  <Camera className="h-8 w-8" />
                </AnimatedIcon>

                <div className="space-y-3 max-w-2xl mt-4">
                  <AnimatedText
                    text="AI-Powered Skin Cancer Screening"
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                    gradient
                  />
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    Check for early signs of skin cancer — detect suspicious moles and skin lesions before they become
                    dangerous.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-6"
                >
                  <Link href="/scan">
                    <GradientButton className="rounded-full shadow-lg">
                      Start Screening <ArrowRight className="ml-2 h-4 w-4" />
                    </GradientButton>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-xl"></div>
                <motion.div
                  className="relative z-10"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Head */}
                    <motion.circle
                      cx="150"
                      cy="100"
                      r="50"
                      fill="#F8FAFC"
                      stroke="#0EA5E9"
                      strokeWidth="2.5"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />

                    {/* Face */}
                    <motion.g
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    >
                      {/* Eyes */}
                      <circle cx="130" cy="95" r="5" fill="#0EA5E9" />
                      <circle cx="170" cy="95" r="5" fill="#0EA5E9" />

                      {/* Smile */}
                      <path
                        d="M130 115C130 115 140 130 150 130C160 130 170 115 170 115"
                        stroke="#0EA5E9"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Glasses */}
                      <circle cx="130" cy="95" r="12" stroke="#0EA5E9" strokeWidth="2" fill="none" />
                      <circle cx="170" cy="95" r="12" stroke="#0EA5E9" strokeWidth="2" fill="none" />
                      <path d="M142 95H158" stroke="#0EA5E9" strokeWidth="2" />
                    </motion.g>

                    {/* Stethoscope */}
                    <motion.path
                      d="M110 130C110 130 95 145 95 160C95 175 110 185 125 185C140 185 150 170 150 160"
                      stroke="#0EA5E9"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.circle
                      cx="125"
                      cy="185"
                      r="8"
                      fill="#0EA5E9"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 3 }}
                    />

                    {/* Body/Lab Coat */}
                    <motion.path
                      d="M100 160V240C100 240 125 250 150 250C175 250 200 240 200 240V160"
                      fill="#F8FAFC"
                      stroke="#0EA5E9"
                      strokeWidth="2.5"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Arms */}
                    <motion.path
                      d="M100 180H70C70 180 60 195 70 210C80 225 100 215 100 215"
                      fill="#F8FAFC"
                      stroke="#0EA5E9"
                      strokeWidth="2.5"
                      animate={{ rotate: [-3, 3, -3] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M200 180H230C230 180 240 195 230 210C220 225 200 215 200 215"
                      fill="#F8FAFC"
                      stroke="#0EA5E9"
                      strokeWidth="2.5"
                      animate={{ rotate: [3, -3, 3] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    />

                    {/* Medical Cross */}
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1.5 }}>
                      <rect x="135" y="200" width="30" height="30" rx="3" fill="#0EA5E9" />
                      <rect x="142.5" y="192.5" width="15" height="45" rx="3" fill="#0EA5E9" />
                    </motion.g>

                    {/* Clipboard */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
                      <rect
                        x="70"
                        y="210"
                        width="30"
                        height="40"
                        rx="3"
                        fill="#F8FAFC"
                        stroke="#0EA5E9"
                        strokeWidth="2"
                      />
                      <path d="M75 220H95" stroke="#0EA5E9" strokeWidth="1.5" />
                      <path d="M75 230H95" stroke="#0EA5E9" strokeWidth="1.5" />
                      <path d="M75 240H85" stroke="#0EA5E9" stroke="#0EA5E9" strokeWidth="1.5" />
                      <path d="M75 240H85" stroke="#0EA5E9" strokeWidth="1.5" />
                    </motion.g>
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8 mt-8">
            <AnimatedCard delay={0.3} glassmorphism className="flex flex-col items-center space-y-3 p-6">
              <AnimatedIcon className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full text-white">
                <Camera className="h-6 w-6" />
              </AnimatedIcon>
              <h3 className="text-xl font-semibold">Quick & Easy</h3>
              <p className="text-center text-muted-foreground">
                Take or upload a photo of suspicious moles or skin lesions and get results in under a minute.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.5} glassmorphism className="flex flex-col items-center space-y-3 p-6">
              <AnimatedIcon className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full text-white">
                <Shield className="h-6 w-6" />
              </AnimatedIcon>
              <h3 className="text-xl font-semibold">Private & Secure</h3>
              <p className="text-center text-muted-foreground">
                No sign-up required. Your photos are analyzed instantly and never stored.
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.7} glassmorphism className="flex flex-col items-center space-y-3 p-6">
              <AnimatedIcon className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full text-white">
                <Activity className="h-6 w-6" />
              </AnimatedIcon>
              <h3 className="text-xl font-semibold">AI-Powered</h3>
              <p className="text-center text-muted-foreground">
                Advanced technology helps detect early signs of skin cancer that might be missed by visual inspection
                alone.
              </p>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.5} className="gradient-bg py-12">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8 gradient-text">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                className="flex flex-col items-center text-center space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                  1
                </div>
                <h3 className="font-medium text-lg">Take a Photo</h3>
                <p className="text-muted-foreground">
                  Use your phone to capture an image of suspicious moles or skin lesions
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                  2
                </div>
                <h3 className="font-medium text-lg">AI Analysis</h3>
                <p className="text-muted-foreground">Our AI examines the image for signs of potential skin cancer</p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                  3
                </div>
                <h3 className="font-medium text-lg">Get Results</h3>
                <p className="text-muted-foreground">Receive a risk assessment and personalized recommendations</p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.7} className="container py-12 md:py-16">
          <AnimatedCard gradient className="bg-white p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-3/5">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Why Check for Skin Cancer?</h2>
              <ul className="space-y-4">
                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </div>
                  <p>Skin cancer is the most common type of cancer, affecting millions worldwide</p>
                </motion.li>

                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </div>
                  <p>Early detection dramatically increases survival rates and treatment options</p>
                </motion.li>

                <motion.li
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1 flex-shrink-0">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </div>
                  <p>Regular monitoring helps identify changes in moles and skin lesions over time</p>
                </motion.li>
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-6"
              >
                <Link href="/scan">
                  <GradientButton className="rounded-full shadow-lg">Start Screening Now</GradientButton>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="md:w-2/5 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-xl"></div>
                <motion.div
                  className="relative z-10 h-full w-full flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-xl"
                  >
                    {/* Head */}
                    <motion.circle
                      cx="100"
                      cy="70"
                      r="40"
                      fill="#F8FAFC"
                      stroke="#0EA5E9"
                      strokeWidth="2"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />

                    {/* Face */}
                    <motion.g
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    >
                      {/* Eyes */}
                      <circle cx="85" cy="65" r="4" fill="#0EA5E9" />
                      <circle cx="115" cy="65" r="4" fill="#0EA5E9" />

                      {/* Smile */}
                      <path
                        d="M85 80C85 80 92 90 100 90C108 90 115 80 115 80"
                        stroke="#0EA5E9"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </motion.g>

                    {/* Stethoscope */}
                    <motion.path
                      d="M70 90C70 90 60 100 60 110C60 120 70 125 80 125C90 125 95 115 95 110"
                      stroke="#0EA5E9"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.circle
                      cx="80"
                      cy="125"
                      r="5"
                      fill="#0EA5E9"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 3 }}
                    />

                    {/* Body/Lab Coat */}
                    <motion.path
                      d="M60 110V160C60 160 80 170 100 170C120 170 140 160 140 160V110"
                      fill="#F8FAFC"
                      stroke="#0EA5E9"
                      strokeWidth="2"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Arms */}
                    <motion.path
                      d="M60 120H40C40 120 35 130 40 140C45 150 60 145 60 145"
                      fill="#F8FAFC"
                      stroke="#0EA5E9"
                      strokeWidth="2"
                      animate={{ rotate: [-2, 2, -2] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M140 120H160C160 120 165 130 160 140C155 150 140 145 140 145"
                      fill="#F8FAFC"
                      stroke="#0EA5E9"
                      strokeWidth="2"
                      animate={{ rotate: [2, -2, 2] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    />

                    {/* Medical Cross */}
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1.5 }}>
                      <rect x="90" cy="130" width="20" height="20" rx="2" fill="#0EA5E9" />
                      <rect x="95" cy="125" width="10" height="30" rx="2" fill="#0EA5E9" />
                    </motion.g>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedCard>
        </AnimatedSection>
      </main>

      <footer className="border-t py-6 backdrop-blur-sm bg-white/70">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-1 rounded-md">
              <Camera size={16} />
            </div>
            <span className="text-sm font-medium gradient-text">SkinCancerCheck</span>
          </motion.div>

          <motion.div
            className="text-sm text-muted-foreground text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>© 2024 SkinCancerCheck. All rights reserved.</p>
            <p className="flex items-center justify-center md:justify-end gap-1 mt-1">
              <Shield size={12} /> Your privacy is our priority. No data stored.
            </p>
          </motion.div>
        </div>
      </footer>

      <FloatingActionButton />
    </div>
  )
}
