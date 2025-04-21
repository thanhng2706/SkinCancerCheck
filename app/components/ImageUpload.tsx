import { useState, useRef } from 'react'
import { Camera, Upload, Loader2, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'

export function ImageUpload() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(false)
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const startCamera = async () => {
    try {
      setIsVideoLoading(true)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setCameraPermissionDenied(false)
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
      setCameraPermissionDenied(true)
    } finally {
      setIsVideoLoading(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)
      const image = canvas.toDataURL('image/jpeg')
      setCapturedImage(image)
      stopCamera()
    }
  }

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

  const resetCapture = () => {
    setCapturedImage(null)
    setIsAnalyzing(false)
  }

  const analyzeImage = async () => {
    if (!capturedImage) return
    
    setIsAnalyzing(true)
    try {
      // TODO: Implement actual API call to analyze image
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated delay
      
      // Navigate to results page or show results modal
    } catch (error) {
      console.error('Error analyzing image:', error)
      // Show error message to user
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Hidden elements */}
      <canvas ref={canvasRef} className="hidden" />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />

      {/* Main content */}
      {!capturedImage ? (
        <div>
          {cameraActive ? (
            <div className="space-y-4">
              <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={stopCamera}
                >
                  Cancel
                </Button>
                <Button
                  onClick={capturePhoto}
                  disabled={isVideoLoading}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Capture
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-center p-6">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">Take or upload a photo of the skin lesion</p>
                  {cameraPermissionDenied && (
                    <p className="mt-2 text-sm text-red-600">
                      Camera access denied. Please check your browser permissions.
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={startCamera}>
                  <Camera className="mr-2 h-4 w-4" /> Take Photo
                </Button>
                <Button
                  variant="outline"
                  onClick={triggerFileInput}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={capturedImage}
              alt="Captured skin lesion"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetCapture}
            >
              Retake
            </Button>
            <Button
              className="flex-1"
              onClick={analyzeImage}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Photo'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 