import { motion } from "framer-motion";
import { type FC, useMemo } from "react";

interface FishAnimationProps {
  count?: number; // Cantidad de peces
}

const FishAnimation: FC<FishAnimationProps> = ({ count = 7 }) => {
  // ✅ URLs OPTIMIZADAS de Cloudinary para SVG
  const FISH_SVG_URLS = {
    right: "https://res.cloudinary.com/dinsl266g/image/upload/f_svg,q_auto,w_100/v1763062079/fish-shape_kh3qwr.svg",
    left: "https://res.cloudinary.com/dinsl266g/image/upload/f_svg,q_auto,w_100/v1763062079/fish-left_x48b0d.svg"
  };

  // Generamos peces con posiciones y tiempos aleatorios
  const fishes = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      size: Math.random() * 50 + 60, // Tamaño entre 60px y 110px
      top: Math.random() * 90, // Posición vertical (0% a 90%)
      delay: Math.random() * 4, // Retardo inicial
      duration: Math.random() * 12 + 8, // Velocidad de nado
      direction: Math.random() > 0.5 ? 1 : -1, // Dirección: 1 (derecha) o -1 (izquierda)
      swimHeight: Math.random() * 40 + 20, // Ondulación vertical
    }));
  }, [count]);

  const getFishMaskPath = (direction: number) => {
    // ✅ Usamos las URLs de Cloudinary optimizadas
    return direction === 1 ? FISH_SVG_URLS.right : FISH_SVG_URLS.left;
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {fishes.map((fish, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${fish.top}%`,
            width: `${fish.size}px`,
            height: `${fish.size / 2}px`,
          }}
          initial={{
            x: fish.direction === 1 ? "-15vw" : "115vw",
            y: 0,
          }}
          animate={{
            x: fish.direction === 1 ? "115vw" : "-15vw",
            y: [0, -fish.swimHeight / 4, 0, fish.swimHeight / 4, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            duration: fish.duration,
            delay: fish.delay,
          }}
        >
          {/* Pez transparente con efecto vidrio */}
          <div
            className="w-full h-full backdrop-blur-md bg-white/30"
            style={{
              // ✅ URLs optimizadas de Cloudinary
              WebkitMaskImage: `url('${getFishMaskPath(fish.direction)}')`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              maskImage: `url('${getFishMaskPath(fish.direction)}')`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: "center",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FishAnimation;