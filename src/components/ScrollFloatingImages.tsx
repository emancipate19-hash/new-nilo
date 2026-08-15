import React, { useEffect, useState, useRef } from 'react';
import { FloatingImageItem, CursorContextState } from '../types';
import { FLOATING_IMAGE_POPUPS } from '../data/projects';
import { Maximize2 } from 'lucide-react';

interface ScrollFloatingImagesProps {
  onSelectImage: (src: string, title: string, location: string) => void;
  setCursorContext: (context: CursorContextState) => void;
  reducedMotion: boolean;
}

export const ScrollFloatingImages: React.FC<ScrollFloatingImagesProps> = () => {
  // Disabled animated popup images that appear while scrolling up or down per user request.
  return null;
};
