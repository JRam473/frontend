// hooks/useArtesaniasData.ts - versión mejorada
import { useState, useMemo, useCallback } from 'react';
import type{ ArtisanCraft, FilterType } from '../types';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

// Importar todos los archivos JSON por idioma
import artesaniasEs from '../../../archivos_data/artesanias.es.json';
import artesaniasEn from '../../../archivos_data/artesanias.en.json'; // ← CREAR ESTE ARCHIVO
import artesaniasNah from '../../../archivos_data/artesanias.nah.json'; // ← CREAR ESTE ARCHIVO

export const useArtesaniasData = (scrollToTop?: () => void) => {
  const [filter, setFilter] = useState<FilterType>('todos');
  const [activeCraft, setActiveCraft] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { language } = useTranslation(); // ← AGREGAR HOOK

  // Seleccionar datos según el idioma - MODIFICADO
  const craftsData: ArtisanCraft[] = useMemo(() => {
    switch (language) {
      case 'es':
        return (artesaniasEs as any).artesanias;
      case 'en':
        return (artesaniasEn as any).artesanias;
      case 'nah':
        return (artesaniasNah as any).artesanias;
      default:
        return (artesaniasEs as any).artesanias;
    }
  }, [language]); // ← RECARGAR CUANDO CAMBIE EL IDIOMA

  // Filtrar artesanías de forma memoizada
  const filteredCrafts = useMemo(() => {
    return filter === 'todos' 
      ? craftsData 
      : craftsData.filter(craft => craft.category === filter);
  }, [filter, craftsData]);

  // Artesanías a mostrar (limitadas o todas)
  const craftsToShow = useMemo(() => {
    return showAll ? filteredCrafts : filteredCrafts.slice(0, 6);
  }, [showAll, filteredCrafts]);

  const handleFilterClick = (newFilter: FilterType) => {
    setFilter(newFilter);
    setActiveCraft(null);
    setShowAll(false);
  };

  const handleCraftClick = (id: number) => {
    setActiveCraft(activeCraft === id ? null : id);
  };

  const handleCloseModal = () => {
    setActiveCraft(null);
  };

  const toggleShowAll = useCallback(() => {
    const willShowAll = !showAll;
    setShowAll(willShowAll);
    
    // Si estamos cambiando a "Ver menos", hacer scroll al inicio
    if (!willShowAll) {
      setTimeout(() => {
        scrollToTop?.();
      }, 100);
    }
  }, [showAll, scrollToTop]);

  return {
    craftsData,
    filteredCrafts,
    craftsToShow,
    filter,
    activeCraft,
    showAll,
    handleFilterClick,
    handleCraftClick,
    handleCloseModal,
    toggleShowAll,
    setActiveCraft
  };
};