"use client"

import type React from "react"

import { useState } from "react"
import { Share2, Check, Copy, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"

interface ShareWithDoctorProps {
  riskLevel: "low" | "medium" | "high" | null
  imageUrl?: string
}

export function ShareWithDoctor({ riskLevel, imageUrl }: ShareWithDoctorProps) {
  const [copied, setCopied] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleCopyLink = () => {
    // In a real app, this would generate a secure, time-limited link
    navigator.clipboard.writeText("https://skincancercheck.app/shared/result/12345")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send an email with the results
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share with Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share with your healthcare provider</DialogTitle>
          <DialogDescription>
            Securely share your skin check results with your doctor for professional evaluation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="link" className="text-left">
              Secure link (valid for 7 days)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="link"
                defaultValue="https://skincancercheck.app/shared/result/12345"
                readOnly
                className="flex-1"
              />
              <Button size="sm" className="px-3" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">This link contains your scan results and risk assessment.</p>
          </div>

          <div className="relative mt-4 rounded-md border p-4">
            <h4 className="mb-2 font-medium">Email to your doctor</h4>
            <form onSubmit={handleSendEmail}>
              <div className="grid gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="doctor-email">Doctor&apos;s email</Label>
                  <Input id="doctor-email" type="email" placeholder="doctor@example.com" required />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="message">Additional notes (optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Any additional information you'd like to share with your doctor..."
                    className="h-20"
                  />
                </div>
                <Button type="submit" className="mt-2 w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Secure Email
                </Button>
              </div>
            </form>

            <AnimatePresence>
              {emailSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center rounded-md bg-green-50/90 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 rounded-full bg-green-100 p-2">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="font-medium text-green-800">Email sent successfully!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="w-full rounded-md bg-blue-50 p-3 text-sm text-blue-700">
            <p className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-500">ℹ️</span>
              Your data is encrypted and will only be accessible to the recipient with the secure link.
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
