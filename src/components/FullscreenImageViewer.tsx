import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { CursorContextState } from '../types';

interface FullscreenImageViewerProps {
  image: {
    src: string;
    title: string;
    location: string;
  } | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  setCursorContext: (context: CursorContextState) => void;
}

export const FullscreenImageViewer: React.FC<FullscreenImageViewerProps> = ({
  image,
  onClose,
  onNext,
  onPrev,
  setCursorContext
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0a0b0d] p-6 md:p-10 transition-opacity duration-300">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between text-slate-300 z-10">
        <div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase font-semibold">
            FULLSCREEN ARCHITECTURAL GALLERY
          </div>
          <h3 className="text-sm font-mono text-slate-100 font-bold mt-0.5">
            {image.title}
          </h3>
        </div>

        <button
          onClick={onClose}
          onMouseEnter={() => setCursorContext({ mode: 'link', text: 'CLOSE' })}
          onMouseLeave={() => setCursorContext({ mode: 'default' })}
          className="rounded-full bg-slate-900 p-3 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Centered Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-6 overflow-hidden">
        <img
          src={image.src}
          alt={image.title}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain rounded-[2px] shadow-[0_0_80px_rgba(0,0,0,0.9)]"
        />

        {/* Previous Button */}
        {onPrev && (
          <button
            onClick={onPrev}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'PREV' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 p-3.5 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Next Button */}
        {onNext && (
          <button
            onClick={onNext}
            onMouseEnter={() => setCursorContext({ mode: 'link', text: 'NEXT' })}
            onMouseLeave={() => setCursorContext({ mode: 'default' })}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 p-3.5 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Bottom Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80 pt-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-slate-500">LOCATION: </span>
            <span className="text-slate-200">{image.location}</span>
          </div>
          <div>
            <span className="text-slate-500">RESOLUTION: </span>
            <span className="text-slate-200">4K ULTRA ARCHITECTURAL</span>
          </div>
        </div>

        <div className="text-slate-500">
          USE LEFT / RIGHT KEYS TO NAVIGATE — ESC TO EXIT
        </div>
      </div>
    </div>
  );
};
