// pages/CommunitySection.tsx
import { CommunityHome } from '@/comunidad/CommunityHome';
import { RootsSection } from '@/comunidad/RootsSection';
import { VibrantPresentSection } from '@/comunidad/VibrantPresentSection';
import { CooperativaSection } from '@/comunidad/CooperativaSection';
import { VocesDeNuestraTierra } from '@/comunidad/VocesDeNuestraTierra';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Necesitas importar useLocation

export function CommunitySection() {
    const location = useLocation();

    useEffect(() => {
        // Verifica si la URL tiene un hash (ej: #avances)
        if (location.hash) {
            // Elimina el '#' inicial para obtener el ID
            const elementId = location.hash.substring(1);
            const element = document.getElementById(elementId);
            
            if (element) {
                // Hace scroll suave a la sección
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Opcional: Si no hay hash, asegúrate de que esté arriba (comportamiento por defecto)
            window.scrollTo(0, 0); 
        }
    }, [location]); // Ejecuta cuando cambie la ruta (incluyendo el hash)

    return (
        <>
            <CommunityHome />
            <RootsSection />
            {/* VibrantPresentSection contiene UpcomingAttractionsSection */}
            <VibrantPresentSection /> 
            <CooperativaSection />
            <VocesDeNuestraTierra />
        </>
    );
}