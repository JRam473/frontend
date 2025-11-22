// src/sections/VocesDeNuestraTierra/useCarousel.ts
import { useState, useEffect } from "react";

export function useCarousel(length: number, autoplay = 6000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(next, autoplay);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return {
    currentIndex,
    direction,
    isPlaying,
    setIsPlaying,
    next,
    prev,
    goTo
  };
}
