
import { useState, useEffect } from 'react';

export const useFeatureTransition = (totalCards: number, autoTransitionDelay: number = 4000) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalCards);
      }, autoTransitionDelay);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [totalCards, autoTransitionDelay, isAutoPlaying]);

  const handleCardClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    
    // Resume auto-playing after 10 seconds of inactivity
    const timer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);

    return () => clearTimeout(timer);
  };

  return {
    activeIndex,
    handleCardClick,
    setIsAutoPlaying
  };
};
