import type { FC } from 'react';

export const AnimatedTitleFallback: FC<{ isMobile: boolean }> = ({ }) => (
  <div className="text-3xl sm:text-5xl font-serif font-bold text-white">
    San Juan Tahitic
  </div>
);
