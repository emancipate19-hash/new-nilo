import React, { useRef, useState } from 'react';

interface ImageHoverLightingProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  lightIntensity?: number; // 0.1 to 0.4
}

export const ImageHoverLighting: React.FC<ImageHoverLightingProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  lightIntensity = 0.25
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 }); // percentage
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setLightPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Base Architectural Image */}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-filter duration-300 ${imageClassName}`}
      />

      {/* Facade Architectural Highlight Layer (Slightly contrast-enhanced / brighter image revealed under spotlight) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 180px at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, ${lightIntensity}) 0%, rgba(165, 243, 252, ${
            lightIntensity * 0.5
          }) 35%, transparent 70%)`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Micro specular light ring */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 80px at ${lightPos.x}% ${lightPos.y}%, rgba(224, 247, 252, ${
            lightIntensity * 0.8
          }) 0%, transparent 80%)`,
          mixBlendMode: 'soft-light'
        }}
      />
    </div>
  );
};
