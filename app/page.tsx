"use client"

import Link from "next/link"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Camera className="h-6 w-6" />
            <span className="font-bold">SkinCancerCheck</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              AI-Powered Skin Cancer Screening
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Check for early signs of skin cancer — detect suspicious moles and skin lesions before they become dangerous.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/scan">
              <Button>Start Screening</Button>
            </Link>
          </div>
        </section>

        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Camera className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Quick & Easy</h3>
                  <p className="text-sm text-muted-foreground">
                    Take or upload a photo of suspicious moles or skin lesions and get results in under a minute.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-12 w-12"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div className="space-y-2">
                  <h3 className="font-bold">Private & Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    No sign-up required. Your photos are analyzed instantly and never stored.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-12 w-12"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <div className="space-y-2">
                  <h3 className="font-bold">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced machine learning algorithms trained on thousands of medical images.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
