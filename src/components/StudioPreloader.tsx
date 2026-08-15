import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEFAULT_UPLOADED_PICTURES, DEFAULT_LOGO_URL, FALLBACK_VECTOR_LOGO_URL, logoThumbnailImg } from '../assets/images/defaultAssets';
import { Compass, Check } from 'lucide-react';

interface StudioPreloaderProps {
  onComplete?: () => void;
  reducedMotion?: boolean;
}

export const StudioPreloader: React.FC<StudioPreloaderProps> = ({ onComplete, reducedMotion = false }) => {
  const [progress, setProgress] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusText, setStatusText] = useState('CALIBRATING SPATIAL DATA...');

  useEffect(() => {
    // Preload all default uploaded pictures into browser cache
    let loadedCount = 0;
    const totalAssets = DEFAULT_UPLOADED_PICTURES.length + 1; // +1 for logo

    const updateProgress = () => {
      loadedCount++;
      const pct = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
      setProgress(pct);
      
      if (pct < 35) {
        setStatusText('INITIALIZING STRUCTURAL RENDERS...');
      } else if (pct < 70) {
        setStatusText('LOADING ARCHITECTURAL VISUALS...');
      } else if (pct < 100) {
        setStatusText('CALIBRATING ATELIER PORTFOLIO...');
      } else {
        setStatusText('NILO AXIS STUDIO READY');
      }

      if (loadedCount >= totalAssets) {
        setTimeout(() => {
          setIsLoaded(true);
          if (onComplete) onComplete();
        }, 400);
      }
    };

    // Preload logo
    const logoImg = new Image();
    logoImg.src = DEFAULT_LOGO_URL;
    logoImg.onload = updateProgress;
    logoImg.onerror = updateProgress;

    // Preload all uploaded high-res pictures
    DEFAULT_UPLOADED_PICTURES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    // Fallback timer in case network delays image events
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsLoaded(true);
      if (onComplete) onComplete();
    }, 1800);

    // Image slideshow during loading
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % DEFAULT_UPLOADED_PICTURES.length);
    }, 450);

    return () => {
      clearTimeout(fallbackTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          id="studio-default-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Subtle Background Carousel of Uploaded Pictures */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            {DEFAULT_UPLOADED_PICTURES.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt="Architectural default visual"
                className={`absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 transition-opacity duration-700 ${
                  idx === activeImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
          </div>

          {/* Blueprint Grid Lines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Main Preloader Content */}
          <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-6">
            {/* Studio Logo Emblem */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl border border-amber-400/40 p-2 shadow-[0_0_30px_rgba(245,158,11,0.25)] bg-slate-900/90 backdrop-blur-md flex items-center justify-center overflow-hidden">
                <img
                  src={DEFAULT_LOGO_URL}
                  alt="NILO AXIS Emblem"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src === logoThumbnailImg) {
                      target.src = FALLBACK_VECTOR_LOGO_URL;
                    } else if (target.src !== FALLBACK_VECTOR_LOGO_URL) {
                      target.src = logoThumbnailImg;
                    }
                  }}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-amber-500 rounded-full text-slate-950 shadow-md">
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              </div>
            </div>

            {/* Studio Brand Title */}
            <div>
              <h2 className="text-xl font-bold tracking-[0.25em] text-white font-mono uppercase">
                NILO AXIS STUDIO
              </h2>
              <p className="text-[10px] tracking-[0.3em] text-amber-400 font-mono uppercase mt-1">
                CONTEMPORARY ARCHITECTURE & DESIGN
              </p>
            </div>

            {/* Uploaded Pictures Thumbnails Strip Preview */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-sm shadow-inner backdrop-blur-sm">
              {DEFAULT_UPLOADED_PICTURES.map((src, i) => (
                <div
                  key={i}
                  className={`w-10 h-8 rounded-xs overflow-hidden border transition-all duration-300 ${
                    i === activeImageIndex
                      ? 'border-amber-400 scale-110 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                      : 'border-slate-800 opacity-40'
                  }`}
                >
                  <img src={src} alt="Default loading asset" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  {statusText}
                </span>
                <span className="font-bold text-white tracking-widest">{progress}%</span>
              </div>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Bottom Metadata */}
            <div className="text-[9px] font-mono text-slate-600 tracking-widest uppercase flex items-center justify-center gap-3">
              <span>LAT: 8.995° N</span>
              <span>•</span>
              <span>LON: 38.788° E</span>
              <span>•</span>
              <span>DEFAULT ASSETS PERSISTED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
