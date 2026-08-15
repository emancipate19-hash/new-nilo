import React, { useEffect, useRef, useState } from 'react';
import { CursorContextState } from '../types';

interface CursorSystemProps {
  cursorContext: CursorContextState;
  reducedMotion: boolean;
}

export const CursorSystem: React.FC<CursorSystemProps> = ({ cursorContext, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Real mouse coords
  const mouseRef = useRef({ x: -100, y: -100 });
  // Smooth animated coords with inertia
  const smoothMouseRef = useRef({ x: -100, y: -100 });
  
  // Trail history points (3-8 points)
  const trailRef = useRef<{ x: number; y: number; opacity: number; size: number }[]>([]);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile touch device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse position and add trail points
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isHovered) setIsHovered(true);

      // Add trail point
      const lastPoint = trailRef.current[0];
      const dist = lastPoint
        ? Math.hypot(e.clientX - lastPoint.x, e.clientY - lastPoint.y)
        : 100;

      if (dist > 4) {
        trailRef.current.unshift({
          x: e.clientX,
          y: e.clientY,
          opacity: 0.8,
          size: cursorContext.mode === 'default' ? 4 : 8,
        });
        if (trailRef.current.length > 8) {
          trailRef.current.pop();
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, isMobile, cursorContext.mode]);

  // Render loop using requestAnimationFrame
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth inertia interpolation (0.15 lerp factor)
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      smoothMouseRef.current.x += (targetX - smoothMouseRef.current.x) * 0.18;
      smoothMouseRef.current.y += (targetY - smoothMouseRef.current.y) * 0.18;

      const sx = smoothMouseRef.current.x;
      const sy = smoothMouseRef.current.y;

      if (isHovered && sx > 0 && sy > 0) {
        // 01 — LOCALIZED LIGHT FIELD (Spotlight illumination around cursor)
        const glowRadius = cursorContext.mode === 'default' ? 220 : 320;
        const radialGradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
        
        // Neon color palette: Cyan-White electric architectural glow
        const glowColor = cursorContext.color || 'rgba(165, 243, 252, '; // #a5f3fc
        const baseOpacity = cursorContext.intensity === 'high' ? 0.22 : cursorContext.intensity === 'medium' ? 0.15 : 0.08;

        radialGradient.addColorStop(0, `${glowColor}${baseOpacity * 1.5})`);
        radialGradient.addColorStop(0.3, `${glowColor}${baseOpacity * 0.7})`);
        radialGradient.addColorStop(0.7, `${glowColor}${baseOpacity * 0.2})`);
        radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 02 — CURSOR LIGHT TRAIL (3-8 fading particles)
        for (let i = 0; i < trailRef.current.length; i++) {
          const pt = trailRef.current[i];
          pt.opacity *= 0.85; // quick fade
          pt.size *= 0.92;

          if (pt.opacity > 0.02) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, Math.max(pt.size, 1), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(224, 247, 252, ${pt.opacity * 0.6})`;
            ctx.shadowColor = 'rgba(165, 243, 252, 0.8)';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }

        // Clean dead trail points
        trailRef.current = trailRef.current.filter((pt) => pt.opacity > 0.02);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isHovered, reducedMotion, isMobile, cursorContext]);

  if (reducedMotion || isMobile) {
    return null;
  }

  // Determine badge shape & text based on mode
  const isBadge = cursorContext.mode !== 'default' && cursorContext.mode !== 'hidden';
  const badgeText = cursorContext.text || (
    cursorContext.mode === 'project' ? 'VIEW PROJECT' :
    cursorContext.mode === 'image' ? 'EXPLORE' :
    cursorContext.mode === 'video' ? 'PLAY' :
    cursorContext.mode === 'rotate' ? '3D ROTATE' :
    cursorContext.mode === 'link' ? 'OPEN →' :
    cursorContext.mode === 'drag' ? 'DRAG' :
    cursorContext.mode === 'floorplan' ? 'INSPECT' : ''
  );

  return (
    <>
      {/* Background Canvas for Light Trail & Spotlight Field */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9990] h-full w-full mix-blend-screen"
      />

      {/* Foreground Luminous Dot & Badge Indicator */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${smoothMouseRef.current.x}px, ${smoothMouseRef.current.y}px, 0)`,
          display: isHovered && cursorContext.mode !== 'hidden' ? 'block' : 'none',
        }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Luminous Center Point */}
          <div
            className={`rounded-full transition-all duration-300 ${
              isBadge
                ? 'h-20 w-20 bg-slate-950/80 border border-cyan-300/40 backdrop-blur-md shadow-[0_0_25px_rgba(165,243,252,0.35)]'
                : 'h-3 w-3 bg-cyan-100 shadow-[0_0_12px_#38bdf8,0_0_24px_#a5f3fc]'
            } flex items-center justify-center text-center`}
          >
            {isBadge && (
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-[10px] font-mono tracking-[0.2em] font-semibold text-cyan-200 uppercase whitespace-nowrap">
                  {badgeText}
                </span>
                {cursorContext.subtext && (
                  <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
                    {cursorContext.subtext}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
