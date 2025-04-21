import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera } from '@/components/ui/camera';
import { Button } from '@/components/ui/button';
import { Camera as CameraIcon, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageCapture: (file: File) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageCapture,
  className,
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (err) {
      setError('Failed to access camera. Please ensure camera permissions are granted.');
      console.error('Error accessing camera:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  }, [stream]);

  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
      onImageCapture(file);
      stopCamera();
    }, 'image/jpeg');
  }, [onImageCapture, stopCamera]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageCapture(file);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className={cn('space-y-4', className)}>
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-lg flex items-center gap-2">
          <span>{error}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4"
            onClick={() => setError(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {isCameraActive ? (
        <div className="space-y-4">
          <Camera videoRef={videoRef} />
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={captureImage}
              disabled={isLoading}
            >
              Capture
            </Button>
            <Button
              variant="outline"
              onClick={stopCamera}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={startCamera}
            disabled={isLoading}
          >
            <CameraIcon className="mr-2 h-4 w-4" />
            Use Camera
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      )}
    </div>
  );
}; 