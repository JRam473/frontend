import { CultureHome } from '@/cultura/CultureHome';
import { CultureSection } from '@/cultura/CultureSection';
import { CultureLanguageSection } from '@/cultura/CultureLanguageSection';
import { CultureGastronomySection } from '@/cultura/CultureGastronomy';
import { CultureDance } from '@/cultura/CultureDance';
import { CultureArtesanias } from '@/cultura/CultureArtesanias';

export function CulturePage() {
  /*useEffect(() => {
    console.log('🔍 Hash cambiado:', hash || 'VACÍO');
    
    // 🔴 AGREGAR ESTACK TRACE PARA VER DÓNDE SE ORIGINA
    if (hash === '') {
      console.trace('🚨 SE LIMPIÓ EL HASH - Stack trace:');
    }
  }, [hash]);*/

  /*useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          console.log('🎯 Haciendo scroll a:', hash);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      }
    //} else {
     // console.log('🔄 Hash vacío - Scroll al top');
      //window.scrollTo({ top: 0, behavior: 'smooth' });
   // } 
  }, [hash]);*/

  return (
    <>
      <CultureHome />
      <CultureSection />
      <CultureLanguageSection />
      <CultureArtesanias />
      <CultureGastronomySection />
      <CultureDance />
    </>
  );
}
