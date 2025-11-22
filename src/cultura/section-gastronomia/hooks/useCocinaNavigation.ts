import { useState } from 'react';

export function useCocinaNavigation(cocinasLength: number) {
  const [cocinaActiva, setCocinaActiva] = useState(0);

  const siguienteCocina = () => {
    setCocinaActiva((prev) => (prev + 1) % cocinasLength);
  };

  const anteriorCocina = () => {
    setCocinaActiva((prev) => (prev - 1 + cocinasLength) % cocinasLength);
  };

  const irACocina = (index: number) => {
    setCocinaActiva(index);
  };

  return {
    cocinaActiva,
    siguienteCocina,
    anteriorCocina,
    irACocina
  };
}