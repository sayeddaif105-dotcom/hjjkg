import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ZoomIn,
  ZoomOut,
  Download,
  ChevronRight,
  ChevronLeft,
  Heart,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { WeddingCard } from '../types';

interface CardLightboxProps {
  card: WeddingCard | null;
  allCards: WeddingCard[];
  isOpen: boolean;
  onClose: () => void;
  onBookCard: (card: WeddingCard) => void;
}

export const CardLightbox: React.FC<CardLightboxProps> = ({
  card,
  allCards,
  isOpen,
  onClose,
  onBookCard,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentCardId, setCurrentCardId] = useState<number | null>(null);

  // Sync current card
  useEffect(() => {
    if (card) {
      setCurrentCardId(card.id);
      setZoomLevel(1);
    }
  }, [card]);

  const activeCard = allCards.find((c) => c.id === currentCardId) || card;

  const currentIndex = activeCard
    ? allCards.findIndex((c) => c.id === activeCard.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < allCards.length - 1) {
      setCurrentCardId(allCards[currentIndex + 1].id);
      setZoomLevel(1);
    } else if (currentIndex === allCards.length - 1) {
      setCurrentCardId(allCards[0].id); // loop back
      setZoomLevel(1);
    }
  }, [currentIndex, allCards]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentCardId(allCards[currentIndex - 1].id);
      setZoomLevel(1);
    } else if (currentIndex === 0) {
      setCurrentCardId(allCards[allCards.length - 1].id); // loop to end
      setZoomLevel(1);
    }
  }, [currentIndex, allCards]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handleNext(); // in RTL, left is next
      if (e.key === 'ArrowRight') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !activeCard) return null;

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(activeCard.imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `medo-wedding-card-${activeCard.cardNumber}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback direct open in new tab
      window.open(activeCard.imageUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-xl p-2 sm:p-4 select-none">
        
        {/* Top Control Bar */}
        <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between z-20 pointer-events-auto">
          
          {/* Card Info Pill */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-stone-900/90 border border-amber-500/30 text-white shadow-xl max-w-xs sm:max-w-md">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
            <div className="text-right truncate">
              <span className="font-black text-xs sm:text-sm block truncate">
                {activeCard.weddingTitle}
              </span>
              <span className="text-[10px] sm:text-xs text-amber-300 block truncate">
                {activeCard.date} • {activeCard.location}
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
              title="تكبير"
            >
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleZoomOut}
              className="p-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
              title="تصغير"
            >
              <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {zoomLevel !== 1 && (
              <button
                onClick={handleResetZoom}
                className="p-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-400 border border-stone-700 transition-colors cursor-pointer"
                title="إعادة الحجم الافتراضي"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            <button
              onClick={handleDownload}
              className="p-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer"
              title="تحميل صورة الكرت"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-500/40 transition-colors cursor-pointer mr-1"
              title="إغلاق"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Previous Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="الكرت السابق"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Next Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white border border-stone-700 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="الكرت التالي"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Main Card Image Area with Zoom */}
        <motion.div
          key={activeCard.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-2xl max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center p-2"
        >
          <div className="overflow-hidden rounded-2xl border-2 border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-stone-900">
            <img
              src={activeCard.imageUrl}
              alt={activeCard.title}
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease-out',
              }}
              className="max-h-[68vh] sm:max-h-[74vh] w-auto object-contain pointer-events-auto"
            />
          </div>
        </motion.div>

        {/* Bottom Booking Action Bar */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onBookCard(activeCard);
            }}
            className="py-3.5 px-8 sm:px-12 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-base sm:text-lg shadow-2xl shadow-rose-950/80 flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white animate-pulse" />
            <span>احجز هذا الكرت الآن (رقم {activeCard.cardNumber})</span>
          </button>
        </div>

      </div>
    </AnimatePresence>
  );
};
