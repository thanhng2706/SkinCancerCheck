"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, Activity, Briefcase, GraduationCap, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedCard, AnimatedSection, GradientButton, AnimatedText, BlobBackground } from "@/components/ui-components"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative">
      <BlobBackground />

      <header className="border-b backdrop-blur-sm bg-white/70 sticky top-0 z-10">
        <div className="container flex items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold gradient-text">SkinCancerCheck</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <AnimatedText text="About SkinCancerCheck" className="text-3xl font-bold mb-6" gradient />

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="about" className="rounded-full">
                About
              </TabsTrigger>
              <TabsTrigger value="condition" className="rounded-full">
                Skin Cancer
              </TabsTrigger>
              <TabsTrigger value="team" className="rounded-full">
                Our Team
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <AnimatedCard glassmorphism className="p-6">
                <h3 className="text-xl font-semibold mb-4 gradient-text">Our Mission</h3>
                <p className="text-slate-700 mb-4">
                  SkinCancerCheck is an AI-powered screening tool designed to help people detect potential skin cancer
                  early. Our mission is to improve skin cancer outcomes through accessible technology that enables
                  regular monitoring of suspicious moles and skin lesions.
                </p>
                <div className="bg-blue-50/80 backdrop-blur-sm p-5 rounded-lg border border-blue-100 mt-4">
                  <h4 className="font-medium mb-2 flex items-center text-blue-800">
                    <Shield className="mr-2 h-5 w-5 text-blue-600" />
                    Privacy Commitment
                  </h4>
                  <p className="text-slate-700">
                    Your privacy is our top priority. SkinCancerCheck processes all images locally on your device. We do
                    not store, transmit, or share your photos or personal information.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard className="bg-amber-50/80 backdrop-blur-sm p-6 rounded-lg border border-amber-200">
                <h4 className="font-medium mb-2 flex items-center text-amber-800">
                  <Activity className="mr-2 h-5 w-5 text-amber-600" />
                  Medical Disclaimer
                </h4>
                <p className="text-slate-700">
                  SkinCancerCheck is designed as a screening tool only and is not intended to replace professional
                  medical advice, diagnosis, or treatment. Always consult with your healthcare provider regarding any
                  suspicious skin lesions or changes in existing moles.
                </p>
              </AnimatedCard>

              <AnimatedSection delay={0.3} className="text-center">
                <Link href="/scan">
                  <GradientButton className="rounded-full shadow-lg">Start Screening</GradientButton>
                </Link>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="condition" className="space-y-6">
              <AnimatedCard glassmorphism className="p-6 border border-teal-200">
                <h3 className="text-xl font-semibold mb-4 gradient-text">What is Skin Cancer?</h3>
                <p className="text-slate-700 mb-4">
                  Skin cancer is the abnormal growth of skin cells, most often developing on skin exposed to the sun. It
                  can also occur on areas of your skin not ordinarily exposed to sunlight.
                </p>
                <p className="text-slate-700">
                  There are three major types of skin cancer — basal cell carcinoma, squamous cell carcinoma and
                  melanoma. Early detection significantly increases the chances of successful treatment.
                </p>
              </AnimatedCard>

              <div className="grid md:grid-cols-2 gap-6">
                <AnimatedCard glassmorphism className="p-6 border border-teal-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-full text-white mr-3">
                      <Activity className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-medium text-teal-800">Key Signs</h4>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-slate-700">Asymmetrical moles or marks</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-slate-700">Irregular borders on moles</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-slate-700">Changes in color or size</p>
                    </li>
                  </ul>
                </AnimatedCard>

                <AnimatedCard glassmorphism className="p-6 border border-teal-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-full text-white mr-3">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-medium text-teal-800">Prevention Tips</h4>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-slate-700">Use sunscreen regularly</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-slate-700">Avoid tanning beds</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-slate-700">Regular skin self-examinations</p>
                    </li>
                  </ul>
                </AnimatedCard>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-8">
              <AnimatedCard glassmorphism className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
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
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold gradient-text">Thanh Nguyen</h3>
                    <p className="text-teal-600 font-medium mb-3">Founder</p>

                    <div className="space-y-3 text-slate-700">
                      <div className="flex items-start gap-2">
                        <Briefcase className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <p>Software Engineer at Hitachi Digital Services</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <GraduationCap className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <p>BS/MS in Computer Science, Worcester Polytechnic Institute</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <p>Experience in AI, web development, and healthcare technology</p>
                      </div>
                    </div>

                    <p className="mt-4 text-slate-600">
                      Thanh leads the technical development of SkinCancerCheck, combining his expertise in software
                      engineering with a passion for healthcare innovation. His background in AI and web development
                      drives the app's intelligent screening capabilities.
                    </p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50">
                <h3 className="text-lg font-semibold mb-4 gradient-text">Our Story</h3>
                <p className="text-slate-700 mb-3">
                  SkinCancerCheck was born from Thanh Nguyen's vision to make early skin cancer detection more
                  accessible. After witnessing the impact of late diagnosis on friends and family, he set out to create
                  a tool that could help people monitor suspicious skin changes regularly and seek medical attention
                  early.
                </p>
                <p className="text-slate-700">
                  By combining advanced AI technology with medical knowledge, SkinCancerCheck aims to improve early
                  detection rates and prevent complications associated with late-stage skin cancer.
                </p>
              </AnimatedCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t py-4 backdrop-blur-sm bg-white/70">
        <div className="container text-center text-sm text-slate-500">
          <p>© 2024 SkinCancerCheck. All rights reserved.</p>
          <p className="mt-1">This application is for educational and screening purposes only.</p>
        </div>
      </footer>
    </div>
  )
}
