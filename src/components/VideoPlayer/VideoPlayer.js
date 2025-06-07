import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoUrl, onProgress, startTime = 0 }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setStartTime = () => {
      if (startTime > 0) {
        video.currentTime = startTime;
      }
    };

    video.addEventListener('loadedmetadata', setStartTime);

    const handleTimeUpdate = () => {
      if (onProgress) {
        onProgress(video.currentTime);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', setStartTime);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onProgress, startTime]);

  return (
    <div className="relative w-full pb-16/9 bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        autoPlay
        src={videoUrl}
      />
    </div>
  );
};

export default VideoPlayer;
