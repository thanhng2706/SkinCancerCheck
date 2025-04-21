import React, { useEffect, useRef } from 'react';

interface CameraProps {
  onVideoLoad?: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const Camera: React.FC<CameraProps> = ({ onVideoLoad, videoRef }) => {
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => {
        onVideoLoad?.();
      });
    }
  }, [onVideoLoad, videoRef]);

  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}; 