"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, Upload, ArrowLeft, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  AnimatedCard,
  AnimatedSection,
  AnimatedIcon,
  GradientButton,
  BlobBackground,
  CameraFrame,
} from "@/components/ui-components"

export default function ScanPage() {
  const router = useRouter()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false)

  const startCamera = async () => {
    try {
      setIsVideoLoading(true)
      setCameraActive(true)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setIsVideoLoading(false)
        setCameraPermissionDenied(false)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraPermissionDenied(true)
      setIsVideoLoading(false)
      setCameraActive(false)
      alert("Unable to access camera. Please check permissions or try uploading an image instead.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      videoRef.current.load() // Reset video element
    }
    setCameraActive(false)
    setIsVideoLoading(false)
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    // Make sure video is playing and has dimensions
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      console.error("Video not ready")
      return
    }

    // Get the video dimensions
    const width = video.videoWidth
    const height = video.videoHeight

    // Set canvas dimensions to match video
    canvas.width = width
    canvas.height = height

    // Draw the current video frame
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // First clear the canvas
      ctx.clearRect(0, 0, width, height)
      
      // Draw the video frame
      try {
        ctx.drawImage(video, 0, 0, width, height)
        // Get blob directly instead of base64
        canvas.toBlob((blob) => {
          if (blob) {
            setCapturedImage(URL.createObjectURL(blob))
          }
        }, 'image/jpeg', 0.92)
        stopCamera()
      } catch (err) {
        console.error("Error capturing photo:", err)
        alert("Failed to capture photo. Please try again.")
      }
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevent form submission
    const file = event.target.files?.[0]
    if (file) {
      try {
        // Create a blob URL directly from the file
        const objectUrl = URL.createObjectURL(file);
        setCapturedImage(objectUrl);
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error handling file upload:', error);
        alert('Failed to process the uploaded image. Please try again.');
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const analyzeImage = async () => {
    try {
      setIsAnalyzing(true);

      if (!capturedImage) {
        throw new Error("No image captured");
      }

      // Fetch the blob from the object URL
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      // Create form data
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');

      // Send to backend with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const apiResponse = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!apiResponse.ok) {
        let errorMessage = `HTTP error! status: ${apiResponse.status}`;
        try {
          const errorData = await apiResponse.json();
          if (typeof errorData === 'object' && errorData !== null && 'detail' in errorData) {
            errorMessage = errorData.detail;
          }
        } catch (e) {
          // If parsing JSON fails, use the default error message
          console.error("Error parsing error response:", e);
        }
        throw new Error(errorMessage);
      }

      const result = await apiResponse.json();
      
      // Store the result in localStorage with the expected format
      localStorage.setItem('lastAnalysis', JSON.stringify({
        riskLevel: result.risk_level,
        confidence: result.confidence,
        prediction: result.prediction,
        warning: result.warning,
        imageInfo: {
          width: 0, // These will be updated when image loads in results page
          height: 0
        },
        timestamp: new Date().toISOString(),
        imageUrl: capturedImage
      }));

      // Navigate to results page using router.push instead of replace
      router.push('/results');
    } catch (error: unknown) {
      console.error('Error analyzing image:', error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          alert('Analysis took too long. Please try again with a smaller image.');
        } else {
          alert(`Failed to analyze image: ${error.message}`);
        }
      } else {
        alert('Failed to analyze image. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetCapture = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage) // Clean up the object URL
    }
    setCapturedImage(null)
    setIsAnalyzing(false)
  }

  // Clean up camera and object URLs on unmount
  useEffect(() => {
    return () => {
      stopCamera()
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage)
      }
    }
  }, [])

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
        <AnimatedSection className="max-w-md mx-auto">
          <motion.h2
            className="text-2xl font-bold mb-6 text-center gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {capturedImage ? "Review Your Photo" : "Take or Upload a Photo"}
          </motion.h2>

          <AnimatedCard glassmorphism className="p-6">
            <AnimatePresence mode="wait">
              {!capturedImage ? (
                <>
                  {cameraActive ? (
                    <motion.div
                      key="camera-active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
                        {isVideoLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                          </div>
                        )}
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="absolute inset-0 w-full h-full object-cover"
                          onLoadedMetadata={() => setIsVideoLoading(false)}
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        <CameraFrame className="absolute inset-0" />
                      </div>
                      <div className="flex justify-center">
                        <motion.button
                          onClick={capturePhoto}
                          className="rounded-full h-16 w-16 bg-gradient-to-r from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={isVideoLoading}
                        >
                          <Camera size={24} />
                        </motion.button>
                      </div>
                      <Button variant="outline" className="w-full rounded-full" onClick={() => stopCamera()}>
                        Cancel
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="camera-inactive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200 relative overflow-hidden">
                        <div className="text-center p-6 z-10">
                          <AnimatedIcon animation="float" className="mx-auto mb-4">
                            <Camera className="h-16 w-16 text-slate-300" />
                          </AnimatedIcon>
                          <p className="text-slate-500">Take or upload a photo of your skin concern</p>
                        </div>
                        {cameraPermissionDenied && (
                          <div className="absolute bottom-0 left-0 right-0 bg-red-50 p-3 text-sm text-red-600 border-t border-red-100">
                            Camera access denied. Please check your browser permissions.
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <GradientButton onClick={startCamera} className="rounded-full">
                          <Camera className="mr-2 h-4 w-4" /> Take Photo
                        </GradientButton>
                        <Button
                          variant="outline"
                          onClick={triggerFileInput}
                          className="rounded-full border-2 hover:bg-slate-50"
                        >
                          <Upload className="mr-2 h-4 w-4" /> Upload
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  key="image-preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative">
                    <img
                      src={capturedImage}
                      alt="Captured skin lesion"
                      className="w-full h-full object-contain"
                    />
                    {!isAnalyzing && (
                      <motion.button
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-slate-600 hover:text-slate-900"
                        onClick={resetCapture}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>
                    )}
                  </div>

                  {isAnalyzing ? (
                    <motion.div className="text-center py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="relative mx-auto mb-4 w-16 h-16">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-teal-100"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <Loader2 className="h-16 w-16 animate-spin mx-auto text-teal-600 relative z-10" />
                      </div>
                      <h3 className="text-lg font-medium mb-1 gradient-text">Analyzing your image...</h3>
                      <p className="text-slate-500">Our AI is examining the photo for signs of skin cancer</p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={resetCapture} className="rounded-full">
                        Retake
                      </Button>
                      <GradientButton onClick={analyzeImage} className="rounded-full">
                        Analyze
                      </GradientButton>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedCard>

          <AnimatedCard delay={0.3} className="mt-6 bg-blue-50/80 backdrop-blur-sm p-5 text-sm text-blue-700">
            <p className="font-medium mb-2">Tips for best results:</p>
            <ul className="space-y-2">
              <motion.li
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-blue-200 rounded-full p-1 mt-0.5 flex-shrink-0">
                  <svg className="h-2 w-2 text-blue-700" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                <p>Ensure good, even lighting without shadows</p>
              </motion.li>
              <motion.li
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-blue-200 rounded-full p-1 mt-0.5 flex-shrink-0">
                  <svg className="h-2 w-2 text-blue-700" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                <p>Position camera 6-8 inches from skin</p>
              </motion.li>
              <motion.li
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-blue-200 rounded-full p-1 mt-0.5 flex-shrink-0">
                  <svg className="h-2 w-2 text-blue-700" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                <p>Keep the mole or skin lesion centered in frame</p>
              </motion.li>
            </ul>
          </AnimatedCard>
        </AnimatedSection>
      </main>

      {/* Hidden canvas for capturing photos */}
      <canvas ref={canvasRef} className="hidden" />

      <footer className="border-t py-4 backdrop-blur-sm bg-white/70">
        <div className="container text-center text-sm text-slate-500">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Your privacy is protected. Images are analyzed locally and never stored.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
