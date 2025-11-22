// src/sections/VocesDeNuestraTierra/components/MiniGallery.tsx
// src/sections/VocesDeNuestraTierra/components/MiniGallery.tsx
import type { Testimonio } from "../data";

interface Props {
  testimonios: Testimonio[];
  currentIndex: number;
  goTo: (index: number) => void;
}

export function MiniGallery({ testimonios, currentIndex, goTo }: Props) {
  return (
    <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
      {testimonios.map((item, index) => (
        <button
          key={item.id}
          onClick={() => goTo(index)}
          aria-label={`Ver testimonio de ${item.nombre}`}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all ${
            currentIndex === index
              ? "border-teal-500 ring-2 ring-teal-400 ring-offset-2"
              : "border-transparent opacity-70 hover:opacity-100"
          }`}
        >
          <img
            src={item.imagen}
            alt={item.nombre}
            className="w-full h-full object-cover rounded-full"
          />
          <span className="sr-only">{item.nombre}</span>
        </button>
      ))}
    </div>
  );
}
