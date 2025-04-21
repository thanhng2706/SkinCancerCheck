"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, Upload, ArrowLeft, Loader2, X, ZoomIn } from "lucide-react"
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
import { FloatingActionButton } from "@/components/floating-action-button"
import { PhotoTipsOverlay } from "@/components/photo-tips-overlay"
import { ProgressIndicator } from "@/components/progress-indicator"
import { TutorialTooltip } from "@/components/tutorial-tooltip"

export default function ScanPage() {
  const router = useRouter()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false)
  const [guideMode, setGuideMode] = useState(false)
  const [magnifierActive, setMagnifierActive] = useState(false)
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const [showPhotoTips, setShowPhotoTips] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [previousImage, setPreviousImage] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      console.log('Starting camera...');
      
      // First set camera active to show loading state
      setCameraActive(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      console.log('Camera stream obtained');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              resolve(true);
            };
          }
        });
        
        await videoRef.current.play();
        console.log('Video playback started');
        setShowPhotoTips(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraActive(false);
      setCameraPermissionDenied(true);
      alert("Unable to access camera. Please check permissions or try uploading an image instead.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame on the canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to base64 image
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      stopCamera();
      }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const analyzeImage = async () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      // Convert base64 to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      
      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');
      
      // Send to backend
      const result = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!result.ok) {
        throw new Error('Analysis failed');
      }
      
      const analysisResult = await result.json();
      
      // Store both image and analysis result
      sessionStorage.setItem("capturedImage", capturedImage);
      sessionStorage.setItem("analysisResult", JSON.stringify(analysisResult));
      
      // Navigate to results page
      router.push("/results");
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const resetCapture = () => {
    // If in compare mode, store the current image before resetting
    if (compareMode && capturedImage) {
      setPreviousImage(capturedImage)
    }

    setCapturedImage(null)
    setIsAnalyzing(false)
    setMagnifierActive(false)
  }

  const toggleGuideMode = () => {
    setGuideMode(!guideMode)
  }

  const toggleCompareMode = () => {
    setCompareMode(!compareMode)

    // If turning off compare mode, clear the previous image
    if (compareMode) {
      setPreviousImage(null)
    }
  }

  const toggleMagnifier = () => {
    setMagnifierActive(!magnifierActive)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (magnifierActive && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMagnifierPosition({ x, y })
    }
  }

  // Add this useEffect to handle video initialization
  useEffect(() => {
    if (cameraActive && videoRef.current) {
      const video = videoRef.current;
      
      // Handle video loading
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });

      // Handle potential errors
      video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        setCameraActive(false);
      });
    }
  }, [cameraActive]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
        setCameraActive(false);
    }
    };
  }, []);

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
        <ProgressIndicator />
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
                        {cameraActive ? (
                          <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                              muted
                              className="absolute inset-0 w-full h-full object-cover z-10"
                        />
                            <CameraFrame className="absolute inset-0 z-20" />
                            
                            {guideMode && (
                              <div className="absolute inset-0 pointer-events-none z-30">
                                {/* Grid overlay */}
                                <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                                  {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="border border-white/30" />
                                  ))}
                                </div>

                                {/* Center target */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-teal-400 rounded-full" />

                                {/* Distance indicator */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                                  Position 6-8 inches from skin
                                </div>
                              </div>
                            )}

                            {showPhotoTips && (
                              <PhotoTipsOverlay 
                                onClose={() => setShowPhotoTips(false)} 
                              />
                            )}
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white">Initializing camera...</p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full" 
                          onClick={toggleGuideMode}
                        >
                          {guideMode ? "Hide Guide" : "Show Guide"}
                        </Button>

                        <motion.button
                          onClick={capturePhoto}
                          className="rounded-full h-16 w-16 bg-gradient-to-r from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Camera size={24} />
                        </motion.button>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full" 
                          onClick={() => stopCamera()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="camera-inactive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-slate-200 relative overflow-hidden">
                        <div className="text-center p-6 z-10">
                          <AnimatedIcon animation="float" className="mx-auto mb-4">
                            <Camera className="h-16 w-16 text-slate-300" />
                          </AnimatedIcon>
                          <p className="text-slate-500 mb-6">Take or upload a photo of your skin concern</p>

                          <div className="relative inline-block mb-4">
                            <TutorialTooltip
                              id="scan-page-intro"
                              title="First Time?"
                              content="Take a clear photo of any suspicious mole or skin lesion. Make sure to use good lighting."
                              position="bottom"
                            />
                          </div>
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
                  <div className="flex gap-2">
                    {compareMode && previousImage && (
                      <div className="aspect-square w-1/2 bg-slate-100 rounded-lg overflow-hidden relative">
                    <img
                          src={previousImage || "/placeholder.svg"}
                          alt="Previous skin lesion"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm p-1 rounded text-xs font-medium">
                          Previous
                        </div>
                      </div>
                    )}

                    <div
                      className={`aspect-square ${compareMode && previousImage ? "w-1/2" : "w-full"} bg-slate-100 rounded-lg overflow-hidden relative`}
                      onMouseMove={handleMouseMove}
                    >
                      <img
                        ref={imageRef}
                      src={capturedImage || "/placeholder.svg"}
                        alt="Captured skin lesion"
                      className="w-full h-full object-contain"
                    />

                      {magnifierActive && (
                        <div
                          className="absolute w-32 h-32 border-2 border-teal-500 rounded-full overflow-hidden shadow-lg pointer-events-none"
                          style={{
                            top: `calc(${magnifierPosition.y}% - 64px)`,
                            left: `calc(${magnifierPosition.x}% - 64px)`,
                            backgroundImage: `url(${capturedImage})`,
                            backgroundPosition: `calc(${magnifierPosition.x}% + 64px - ${magnifierPosition.x}% * 2) calc(${magnifierPosition.y}% + 64px - ${magnifierPosition.y}% * 2)`,
                            backgroundSize: "400% 400%",
                            zIndex: 20,
                          }}
                        />
                      )}

                    {!isAnalyzing && (
                        <>
                      <motion.button
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-slate-600 hover:text-slate-900"
                        onClick={resetCapture}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={16} />
                      </motion.button>

                          <motion.button
                            className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-slate-600 hover:text-slate-900"
                            onClick={toggleMagnifier}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ZoomIn size={16} />
                          </motion.button>
                        </>
                      )}

                      {!isAnalyzing && compareMode && !previousImage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                          <div className="text-center text-white p-4">
                            <p className="mb-2">No previous image available</p>
                            <p className="text-sm">Take this photo to use for future comparisons</p>
                          </div>
                        </div>
                      )}
                    </div>
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
                    <>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="rounded-full" onClick={toggleCompareMode}>
                          {compareMode ? "Hide Compare" : "Compare Mode"}
                        </Button>

                        <Button variant="outline" size="sm" className="rounded-full" onClick={toggleMagnifier}>
                          {magnifierActive ? "Hide Magnifier" : "Magnifier"}
                        </Button>
                      </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" onClick={resetCapture} className="rounded-full">
                        Retake
                      </Button>
                      <GradientButton onClick={analyzeImage} className="rounded-full">
                        Analyze
                      </GradientButton>
                    </div>
                    </>
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

      <FloatingActionButton />
    </div>
  )
}
