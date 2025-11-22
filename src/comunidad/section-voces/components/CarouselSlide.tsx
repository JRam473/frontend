// src/sections/VocesDeNuestraTierra/components/CarouselSlide.tsx
import { motion } from "framer-motion";
import { slideVariants } from "../variants";
import type { Testimonio } from "../data";
import { Quote } from "lucide-react";

interface Props {
  testimonio: Testimonio;
  direction: number;
}

export function CarouselSlide({ testimonio, direction }: Props) {
  const Icon = testimonio.icon;
  return (
    <motion.div
      key={testimonio.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      /* El padre controla la altura con min-h por breakpoint */
      className="relative flex flex-col lg:grid lg:grid-cols-2 
min-h-[480px] sm:min-h-[520px] md:min-h-[600px] 
lg:min-h-[700px] xl:min-h-[750px] 2xl:min-h-[820px]"

    >
      {/* IMAGEN - usar <img> evita repeat y es más predecible */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        {/* imagen de fondo, absoluta y con object-cover */}
        <img
          src={testimonio.imagen}
          alt={`${testimonio.nombre} - imagen`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent lg:bg-gradient-to-t" />

        {/* Contenido encima de la imagen */}
        <div className="relative h-full flex flex-col justify-center items-center text-white p-4 sm:p-6 lg:p-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 p-1 sm:p-2 shadow-xl mb-4">
            <img
              src={testimonio.imagen}
              alt={`${testimonio.nombre} - avatar`}
              className="w-full h-full rounded-full object-cover border-2 sm:border-4 border-white"
              loading="lazy"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif mb-2 drop-shadow">
              {testimonio.nombre}
            </h3>
            <div className="inline-flex items-center bg-white/20 backdrop-blur px-3 py-1 rounded-full border border-white/30 mb-2">
              <Icon className="h-4 w-4 mr-1" />
              <span>{testimonio.rol}</span>
            </div>
            <p className="text-teal-200 text-xs sm:text-sm">{testimonio.detalles}</p>
          </div>
        </div>
      </div>

      {/* TEXTO */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-md">
          <div className="mb-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center shadow">
              <Quote className="h-6 w-6 text-teal-600" />
            </div>
          </div>
          <blockquote className="text-lg sm:text-xl lg:text-2xl italic text-slate-800 mb-6">
            “{testimonio.testimonio}”
          </blockquote>
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-md text-center">
            <span className="font-semibold font-serif text-sm">{testimonio.tagline}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
