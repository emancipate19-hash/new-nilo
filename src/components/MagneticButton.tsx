import React, { useRef, useState } from 'react';
import { CursorContextState } from '../types';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  setCursorContext?: (context: CursorContextState) => void;
  cursorMode?: CursorContextState;
  magneticStrength?: number; // default 0.25 (5-12px max shift)
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  setCursorContext,
  cursorMode,
  magneticStrength = 0.25,
  disabled = false
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * magneticStrength;
    const distanceY = (e.clientY - centerY) * magneticStrength;

    // Clamp maximum movement to 12px
    const clampedX = Math.max(-12, Math.min(12, distanceX));
    const clampedY = Math.max(-12, Math.min(12, distanceY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    if (setCursorContext) {
      setCursorContext({ mode: 'default' });
    }
  };

  const handleMouseEnter = () => {
    if (setCursorContext && cursorMode) {
      setCursorContext(cursorMode);
    }
  };

  return (
    <button
      ref={buttonRef}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center transition-transform duration-200 ease-out active:scale-95 ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </button>
  );
};
