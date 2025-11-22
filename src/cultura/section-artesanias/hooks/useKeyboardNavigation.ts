// hooks/useKeyboardNavigation.ts
import { useEffect } from 'react';
import type { ArtisanCraft } from '../types';

export const useKeyboardNavigation = (
  activeCraft: number | null,
  craftsData: ArtisanCraft[],
  onClose: () => void,
  onNavigate: (id: number) => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeCraft !== null) {
        onClose();
      }
      
      if (activeCraft !== null && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const currentIndex = craftsData.findIndex(craft => craft.id === activeCraft);
        const newIndex = (currentIndex + direction + craftsData.length) % craftsData.length;
        onNavigate(craftsData[newIndex].id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeCraft, craftsData, onClose, onNavigate]);
};