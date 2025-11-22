// src/sections/RootsSection.tsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineModal } from './section/TimelineModal';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { 
  Building, 
  Church, 
  User, 
  Sparkles, 
  RefreshCcw, 
  PartyPopper, 
  Plus, 
  Minus, 
  BookOpen,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { useTimelineData, type TimelineItem } from '../hooks/useTimelineData'; // 👈 IMPORTAR TIPO

const icons = {
  Building,
  Church,
  User,
  Sparkles,
  RefreshCcw,
  PartyPopper,
};


const INITIAL_ITEMS_TO_SHOW = 4;

export function RootsSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedModalItem, setSelectedModalItem] = useState<TimelineItem | null>(null); // 👈 CAMBIAR A TimelineItem
  const { t } = useTranslation();
  
  const { timelineData } = useTimelineData();

  const visibleItems = isExpanded ? timelineData.length : INITIAL_ITEMS_TO_SHOW;
  const hasMoreItems = timelineData.length > INITIAL_ITEMS_TO_SHOW;

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleToggleVisibility = () => {
    if (isExpanded && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsExpanded(prev => !prev);
  };

  const openLightbox = (item: TimelineItem, photoIndex: number) => { // 👈 CAMBIAR A TimelineItem
    setLightboxIndex(photoIndex);
    setSelectedModalItem(item);
    setLightboxOpen(true);
  };

  const slides = selectedModalItem ? [
    { src: selectedModalItem.image },
    ...(selectedModalItem.modalContent?.images?.map(img => ({ src: img })) || [])
  ] : [];

  return (
    <section
      ref={sectionRef} 
      id="raices" 
      className="relative w-full py-20 sm:py-32 overflow-hidden"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dinsl266g/image/upload/v1763117912/roots-background_afnbrt.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50/10 via-slate-50/20 to-slate-50/90 z-10"></div>
      
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-stone-200/80 px-4 py-2 rounded-full mb-4 backdrop-blur-sm">
            <BookOpen className="h-5 w-5 text-stone-600" />
            <span className="text-stone-800 font-medium font-serif">
              {t('timeline.enduringLegacy')}
            </span>
          </div>
          <h2 id="roots-heading" className="text-5xl lg:text-6xl font-bold font-serif text-gray-900 mb-6">
            {t('timeline.our')}{' '}
            <span className="bg-gradient-to-r from-teal-600 via-blue-500 to-emerald-600 bg-clip-text text-transparent">
              {t('timeline.roots')}
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            {t('timeline.description')}
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute w-0.5 h-full bg-stone-300 left-1/2 -translate-x-1/2"></div>

          {timelineData.slice(0, visibleItems).map((item, index) => {
            const IconComponent = icons[item.icon]; // 👈 AHORA ES COMPATIBLE
            return (
              <motion.div
                key={item.id}
                className="relative md:flex md:justify-between md:items-center w-full mb-12"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'}`}></div>
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}>
                  <motion.article 
                    className="relative bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30 
                        hover:shadow-2xl transition-all duration-500 cursor-pointer
                              hover:bg-white/60 hover:backdrop-blur-xl"
                    onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                        {IconComponent && <IconComponent className="h-6 w-6 text-teal-600" aria-hidden="true" />}
                        <p className="text-sm font-semibold font-serif text-teal-600">{item.category}</p>
                    </div>
                    <h3 className="text-2xl font-extrabold font-serif text-slate-800 tracking-wide mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-3xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600 drop-shadow-sm">
                        {item.year}
                      </p>
                      <button
                        aria-label={selectedId === item.id ? t('timeline.collapse') : t('timeline.expand')}
                        className="text-teal-600 hover:text-emerald-700 transition-transform duration-300 hover:rotate-90"
                      >
                        {selectedId === item.id ? <Minus /> : <Plus />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {selectedId === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                          <img 
                            src={item.image} 
                            alt={`Ilustración de ${item.title}`} 
                            className="rounded-lg w-full h-auto object-cover mb-4 mt-2 cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:brightness-110"
                            onClick={() => openLightbox(item, 0)}
                          />
                          <p className="text-slate-600 leading-relaxed">{item.description}</p>
                          {item.modalContent && (
                        <button 
                          onClick={() => setSelectedModalItem(item)}
                          className="inline-block mt-4 text-teal-600 font-semibold font-serif hover:underline"
                        > 
                          {t('timeline.learnMore')}
                        </button>
                      )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                </div>
                
                <motion.div 
                  className="hidden md:flex absolute w-4 h-4 bg-teal-500 rounded-full left-1/2 -translate-x-1/2 -translate-y-4 border-4 border-white shadow-md z-30"
                  whileHover={{ scale: 1.5, borderColor: '#6ee7b7', backgroundColor: '#2dd4bf' }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                ></motion.div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          {hasMoreItems && (
            <motion.button
              onClick={handleToggleVisibility}
              className="bg-teal-500 text-black font-semibold font-serif px-8 py-3 rounded-full shadow-lg hover:bg-teal-600 transition-colors transform hover:scale-105 flex items-center gap-2 mx-auto border border-slate-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isExpanded ? "menos" : "mas"}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isExpanded ? t('timeline.showLess') : t('timeline.showMore')}
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedModalItem && !lightboxOpen && (
          <TimelineModal
            item={selectedModalItem}
            onClose={() => setSelectedModalItem(null)}
            onImageClick={(photoIndex) => openLightbox(selectedModalItem, photoIndex)}
          />
        )}
      </AnimatePresence>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
      />
    </section>
  );
}