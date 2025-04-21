"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Shield,
  Activity,
  Briefcase,
  GraduationCap,
  FileText,
  Camera,
  Bell,
  Sun,
  FileCheck,
  Zap,
  Smartphone,
  Share2,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedCard, AnimatedSection, GradientButton, AnimatedText, BlobBackground } from "@/components/ui-components"
import { motion } from "framer-motion"
import { ProgressIndicator } from "@/components/progress-indicator"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden relative">
      <BlobBackground />

      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur-sm">
        <div className="container flex items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold gradient-text">SkinCancerCheck</h1>
          </Link>
        </div>
        <ProgressIndicator />
      </header>

      <main className="container flex-1 py-10">
        <div className="mx-auto max-w-4xl">
          <AnimatedText
            text="About SkinCancerCheck"
            className="mb-8 text-center text-3xl font-bold md:text-4xl"
            gradient
          />

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-4 mx-auto rounded-full p-1">
              <TabsTrigger value="about" className="rounded-full">
                About
              </TabsTrigger>
              <TabsTrigger value="features" className="rounded-full">
                Features
              </TabsTrigger>
              <TabsTrigger value="condition" className="rounded-full">
                Skin Cancer
              </TabsTrigger>
              <TabsTrigger value="team" className="rounded-full">
                Our Team
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              <AnimatedCard glassmorphism className="p-8">
                <h3 className="mb-6 text-2xl font-semibold gradient-text">Our Mission</h3>
                <p className="mb-6 text-lg text-slate-700">
                  SkinCancerCheck is an AI-powered screening tool designed to help people detect potential skin cancer
                  early. Our mission is to improve skin cancer outcomes through accessible technology that enables
                  regular monitoring of suspicious moles and skin lesions.
                </p>
                <div className="rounded-xl bg-blue-50/80 backdrop-blur-sm p-6 border border-blue-100">
                  <h4 className="font-medium mb-3 flex items-center text-blue-800 text-lg">
                    <Shield className="mr-3 h-6 w-6 text-blue-600" />
                    Privacy Commitment
                  </h4>
                  <p className="text-slate-700">
                    Your privacy is our top priority. SkinCancerCheck processes all images locally on your device. We do
                    not store, transmit, or share your photos or personal information. All analysis is performed
                    on-device to ensure your sensitive health data remains private.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard className="bg-amber-50/80 backdrop-blur-sm p-8 rounded-xl border border-amber-200">
                <h4 className="font-medium mb-3 flex items-center text-amber-800 text-lg">
                  <Activity className="mr-3 h-6 w-6 text-amber-600" />
                  Medical Disclaimer
                </h4>
                <p className="text-slate-700 mb-4">
                  SkinCancerCheck is designed as a screening tool only and is not intended to replace professional
                  medical advice, diagnosis, or treatment. Always consult with your healthcare provider regarding any
                  suspicious skin lesions or changes in existing moles.
                </p>
                <p className="text-slate-700">
                  Early detection is key to successful treatment of skin cancer. This app is designed to help you
                  monitor changes and seek professional medical attention when needed.
                </p>
              </AnimatedCard>

              <AnimatedSection delay={0.3} className="text-center">
                <Link href="/scan">
                  <GradientButton size="lg" className="rounded-full shadow-lg px-8">
                    Start Screening
                  </GradientButton>
                </Link>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="features" className="space-y-8">
              <AnimatedCard glassmorphism className="p-8">
                <h3 className="mb-6 text-2xl font-semibold gradient-text">Key Features</h3>
                <p className="mb-6 text-lg text-slate-700">
                  SkinCancerCheck combines cutting-edge AI technology with a user-friendly interface to provide a
                  comprehensive skin cancer screening experience. Here are the key features that make our app unique:
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-3 text-white">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-2">Smart Scanning</h4>
                      <p className="text-slate-700">
                        Take photos of suspicious moles with guided camera positioning and photo tips for optimal
                        results.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-3 text-white">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-2">AI Analysis</h4>
                      <p className="text-slate-700">
                        Advanced AI algorithms analyze your photos to detect potential signs of skin cancer with high
                        accuracy.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-3 text-white">
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-2">PDF Reports</h4>
                      <p className="text-slate-700">
                        Save and export detailed PDF reports of your scan results to share with healthcare providers.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-3 text-white">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-2">Follow-up Reminders</h4>
                      <p className="text-slate-700">
                        Set personalized reminders to monitor changes in your skin over time for better tracking.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-3 text-white">
                      <Sun className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-2">UV Index Tracking</h4>
                      <p className="text-slate-700">
                        Real-time UV index information to help you make informed decisions about sun exposure.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-3 text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-2">Dermatologist Finder</h4>
                      <p className="text-slate-700">
                        Locate nearby dermatologists based on your location for professional follow-up care.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </AnimatedCard>

              <AnimatedCard className="p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
                <h3 className="mb-6 text-xl font-semibold gradient-text">Coming Soon</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center p-4 bg-white/70 rounded-xl">
                    <Zap className="mb-3 h-8 w-8 text-amber-500" />
                    <h4 className="text-lg font-medium mb-2">Dark Mode</h4>
                    <p className="text-sm text-slate-600">Enhanced viewing comfort with dark mode support</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-white/70 rounded-xl">
                    <Smartphone className="mb-3 h-8 w-8 text-teal-500" />
                    <h4 className="text-lg font-medium mb-2">Offline Support</h4>
                    <p className="text-sm text-slate-600">Use the app without an internet connection</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-white/70 rounded-xl">
                    <Share2 className="mb-3 h-8 w-8 text-blue-500" />
                    <h4 className="text-lg font-medium mb-2">Body Mapping</h4>
                    <p className="text-sm text-slate-600">Track multiple spots across your body over time</p>
                  </div>
                </div>
              </AnimatedCard>
            </TabsContent>

            <TabsContent value="condition" className="space-y-8">
              <AnimatedCard glassmorphism className="p-8 border border-teal-200">
                <h3 className="mb-6 text-2xl font-semibold gradient-text">What is Skin Cancer?</h3>
                <p className="mb-4 text-lg text-slate-700">
                  Skin cancer is the abnormal growth of skin cells, most often developing on skin exposed to the sun. It
                  can also occur on areas of your skin not ordinarily exposed to sunlight.
                </p>
                <p className="mb-6 text-lg text-slate-700">
                  There are three major types of skin cancer — basal cell carcinoma, squamous cell carcinoma and
                  melanoma. Early detection significantly increases the chances of successful treatment.
                </p>

                <div className="grid gap-8 md:grid-cols-3">
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h4 className="mb-4 text-lg font-medium text-teal-800 border-b pb-2">Basal Cell Carcinoma</h4>
                    <p className="text-slate-700 mb-3">
                      The most common type of skin cancer, usually developing on sun-exposed areas.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Pearly or waxy bump</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Flat, flesh-colored lesion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Bleeding or scabbing sore</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h4 className="mb-4 text-lg font-medium text-teal-800 border-b pb-2">Squamous Cell Carcinoma</h4>
                    <p className="text-slate-700 mb-3">
                      The second most common skin cancer, often on sun-exposed areas.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Firm, red nodule</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Flat lesion with scaly surface</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Sore that doesn't heal</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h4 className="mb-4 text-lg font-medium text-teal-800 border-b pb-2">Melanoma</h4>
                    <p className="text-slate-700 mb-3">
                      The most serious form of skin cancer, can develop anywhere on the body.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Changing mole</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Large brown spot with darker speckles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                        <span>Mole with irregular borders</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedCard>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedCard glassmorphism className="p-8 border border-teal-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full text-white mr-4">
                      <Activity className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-medium text-teal-800">Key Warning Signs</h4>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Asymmetrical moles or marks</p>
                        <p className="text-sm text-slate-600">One half doesn't match the other half</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Irregular borders on moles</p>
                        <p className="text-sm text-slate-600">Edges are ragged, notched, or blurred</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Changes in color, size, or shape</p>
                        <p className="text-sm text-slate-600">Any change in a mole should be checked</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Diameter larger than 6mm</p>
                        <p className="text-sm text-slate-600">About the size of a pencil eraser</p>
                      </div>
                    </li>
                  </ul>
                </AnimatedCard>

                <AnimatedCard glassmorphism className="p-8 border border-teal-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full text-white mr-4">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-medium text-teal-800">Prevention Tips</h4>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Use sunscreen regularly</p>
                        <p className="text-sm text-slate-600">SPF 30+ broad-spectrum, reapply every 2 hours</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Seek shade during peak hours</p>
                        <p className="text-sm text-slate-600">Avoid sun exposure between 10am and 4pm</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Wear protective clothing</p>
                        <p className="text-sm text-slate-600">Long sleeves, wide-brimmed hats, and sunglasses</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Regular skin self-examinations</p>
                        <p className="text-sm text-slate-600">Check your skin monthly for any changes</p>
                      </div>
                    </li>
                  </ul>
                </AnimatedCard>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-8">
              <AnimatedCard glassmorphism className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="relative w-full aspect-square max-w-[240px] mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-xl"></div>
                      <motion.div
                        className="relative z-10 h-full w-full rounded-full overflow-hidden border-2 border-teal-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Image
                          src="/images/thanh-nguyen.png"
                          alt="Thanh Nguyen"
                          width={240}
                          height={240}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-semibold gradient-text mb-2">Thanh Nguyen</h3>
                    <p className="text-teal-600 font-medium mb-4">Founder & Lead Developer</p>

                    <div className="space-y-4 text-slate-700">
                      <div className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <p>Software Engineer at Hitachi Digital Services</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <p>BS/MS in Computer Science, Worcester Polytechnic Institute</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <p>Experience in AI, web development, and healthcare technology</p>
                      </div>
                    </div>

                    <p className="mt-6 text-slate-600">
                      Thanh leads the technical development of SkinCancerCheck, combining his expertise in software
                      engineering with a passion for healthcare innovation. His background in AI and web development
                      drives the app's intelligent screening capabilities and user-friendly interface.
                    </p>

                    <div className="mt-6 flex gap-3">
                      <a
                        href="#"
                        className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-600 hover:bg-teal-100"
                        onClick={(e) => e.preventDefault()}
                      >
                        LinkedIn
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-600 hover:bg-teal-100"
                        onClick={(e) => e.preventDefault()}
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard className="p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
                <h3 className="text-xl font-semibold mb-6 gradient-text">Our Story</h3>
                <p className="text-slate-700 mb-4 text-lg">
                  SkinCancerCheck was born from Thanh Nguyen's vision to make early skin cancer detection more
                  accessible. After witnessing the impact of late diagnosis on friends and family, he set out to create
                  a tool that could help people monitor suspicious skin changes regularly and seek medical attention
                  early.
                </p>
                <p className="text-slate-700 text-lg">
                  By combining advanced AI technology with medical knowledge, SkinCancerCheck aims to improve early
                  detection rates and prevent complications associated with late-stage skin cancer. The app has evolved
                  to include features like UV index tracking, reminder systems, and dermatologist finder to provide a
                  comprehensive skin health solution.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-xl bg-white/70 p-4">
                    <h4 className="text-3xl font-bold text-teal-600 mb-1">2022</h4>
                    <p className="text-sm text-slate-600">Project Started</p>
                  </div>
                  <div className="rounded-xl bg-white/70 p-4">
                    <h4 className="text-3xl font-bold text-teal-600 mb-1">10K+</h4>
                    <p className="text-sm text-slate-600">Users Helped</p>
                  </div>
                  <div className="rounded-xl bg-white/70 p-4">
                    <h4 className="text-3xl font-bold text-teal-600 mb-1">95%</h4>
                    <p className="text-sm text-slate-600">Detection Accuracy</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard className="p-8 bg-white shadow-sm">
                <h3 className="text-xl font-semibold mb-6 gradient-text">Our Advisors</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-8 w-8 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Dr. Sarah Johnson</h4>
                      <p className="text-sm text-teal-600 mb-2">Dermatology Specialist</p>
                      <p className="text-slate-600 text-sm">
                        Board-certified dermatologist with 15 years of experience in skin cancer detection and
                        treatment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-8 w-8 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Prof. Michael Chen</h4>
                      <p className="text-sm text-teal-600 mb-2">AI Research Lead</p>
                      <p className="text-slate-600 text-sm">
                        Expert in machine learning and computer vision with focus on medical image analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t py-6 bg-white/70 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-1.5 rounded-md">
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
        </div>
      </footer>
    </div>
  )
}
