import { GalleryGeneralSection } from '@/galeria/GalleryGeneralSection';
import  { ExperienceMural }  from '@/galeria/ExperienceMural';

export function GallerySection() {
  return (
    <>
      {/* Galería general */}
      <GalleryGeneralSection />

      {/* Galería para usuarios */}
      <ExperienceMural />


    </>
  );
}
