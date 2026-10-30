import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoBackgroundProps {
  overlayOpacity?: string;
  showControls?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  overlayOpacity = 'bg-slate-900/65',
  showControls = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  // High quality royalty-free pet care / veterinary clinic looped videos
  const videoSources = [
    'https://assets.mixkit.co/videos/preview/mixkit-veterinarian-caring-for-a-small-dog-42544-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-dog-running-in-the-grass-41641-large.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none -z-10">
      {!hasError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onError={() => setHasError(true)}
          poster="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 transform transition duration-1000 ease-out"
        >
          <source src={videoSources[0]} type="video/mp4" />
          <source src={videoSources[1]} type="video/mp4" />
        </video>
      ) : (
        <img
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1920&q=80"
          alt="Happy Pets"
          className="w-full h-full object-cover"
        />
      )}

      {/* Cinematic Gradient Overlays for optimal readability and medical teal aesthetic */}
      <div className={`absolute inset-0 ${overlayOpacity} backdrop-blur-[2px] transition-colors`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-transparent to-teal-950/40" />

      {/* Floating control buttons */}
      {showControls && (
        <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg text-xs text-white/80">
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause Background' : 'Play Background'}
            className="p-1 hover:text-emerald-400 transition"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span className="text-white/30">|</span>
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1 hover:text-emerald-400 transition"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400 ml-1 hidden sm:inline">
            Live Pet Care Ambience
          </span>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;

