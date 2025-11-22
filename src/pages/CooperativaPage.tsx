import { CooperativaHero } from "@/comunidad/section/CooperativaHero";
import { ServiciosSection } from "@/comunidad/ServiciosSection";
export function CooperativaPage (){
    const handleScrollToHighlights = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  };
    return(
        <>
            <CooperativaHero 
            onDiscoverClick={handleScrollToHighlights} />
            <ServiciosSection />
        </>
    );
}