import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpDown, Eye, Heart, Sparkles, Filter, RotateCcw, Calendar, MapPin } from 'lucide-react';
import { WeddingCard } from '../types';
import { weddingCards } from '../data/cardsData';

interface CardsGalleryProps {
  onViewCard: (card: WeddingCard) => void;
  onBookCard: (card: WeddingCard) => void;
}

export const CardsGallery: React.FC<CardsGalleryProps> = ({ onViewCard, onBookCard }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  // Unique tags for quick filtering
  const allTags = ['all', 'شعبي راقي', 'عصري مودرن', 'فخم كلاسيك', 'مهرجان فرحتنا', 'ذهبي ملكي'];

  // Filter & Sort cards
  const filteredCards = useMemo(() => {
    let result = [...weddingCards];

    // Filter by category tag
    if (selectedTag !== 'all') {
      result = result.filter((card) => card.tag === selectedTag);
    }

    // Sort order
    result.sort((a, b) => {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });

    return result;
  }, [sortOrder, selectedTag]);

  const handleImageLoaded = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleResetFilters = () => {
    setSortOrder('asc');
    setSelectedTag('all');
  };

  return (
    <section id="cards-gallery" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>تصميمات جاهزة حصرية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
            <span>✨ كروت الأفراح</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            تصفح معرضنا من أحدث كروت الفرح الشعبية والعصرية، اضغط لعرض الكرت بالتفصيل أو احجزه فوراً
          </p>
        </div>

        {/* Controls Toolbar (Search removed as requested) */}
        <div className="bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            
            {/* Tag Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
              <span className="text-xs text-stone-400 shrink-0 flex items-center gap-1 font-bold">
                <Filter className="w-3.5 h-3.5 text-amber-400" /> الفئة:
              </span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50'
                      : 'bg-stone-950/70 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {tag === 'all' ? 'جميع التصاميم' : tag}
                </button>
              ))}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-stone-400 hidden sm:inline font-bold flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" /> الترتيب:
              </span>

              <button
                onClick={() => setSortOrder('asc')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sortOrder === 'asc'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                تصاعدي
              </button>

              <button
                onClick={() => setSortOrder('desc')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  sortOrder === 'desc'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                تنازلي
              </button>

              <button
                onClick={handleResetFilters}
                className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="عرض كل الكروت"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>كل الكروت</span>
              </button>
            </div>

          </div>
        </div>

        {/* Cards Grid: Mobile 2 columns, Tablet 3 columns, Desktop 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, idx) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.3) }}
                className="group relative flex flex-col bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
              >
                {/* Image Container */}
                <div
                  className="relative w-full aspect-[3/4] bg-stone-950 overflow-hidden cursor-pointer"
                  onClick={() => onViewCard(card)}
                >
                  {/* Shimmer while loading */}
                  {!loadedImages[card.id] && (
                    <div className="absolute inset-0 bg-stone-800/80 animate-pulse flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-stone-600" />
                    </div>
                  )}

                  <img
                    src={card.imageUrl}
                    alt={card.weddingTitle}
                    loading="lazy"
                    onLoad={() => handleImageLoaded(card.id)}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      loadedImages[card.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Card Number Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-stone-950/90 border border-amber-500/50 text-amber-300 text-[11px] font-black shadow-md">
                      كارت {card.cardNumber}
                    </span>
                  </div>

                  {/* Popular Badge if applicable */}
                  {card.isPopular && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold shadow">
                        الأكثر طلباً 🔥
                      </span>
                    </div>
                  )}

                  {/* Tag on bottom right */}
                  <div className="absolute bottom-2.5 right-2.5 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-stone-900/85 backdrop-blur-sm text-amber-200 text-[10px] font-medium border border-stone-800">
                      {card.tag}
                    </span>
                  </div>

                  {/* Hover Quick View Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Card Details: Name, Date, Address under image */}
                <div className="p-3 sm:p-4 flex flex-col gap-2 bg-stone-900/95 border-t border-amber-500/20 text-right flex-1 justify-between">
                  <div className="space-y-1.5">
                    {/* الاسم */}
                    <div className="flex items-start gap-1.5">
                      <span className="text-[11px] font-bold text-amber-400 shrink-0 mt-0.5">الاسم:</span>
                      <h3 className="text-xs sm:text-sm font-black text-white leading-tight break-words">
                        {card.weddingTitle}
                      </h3>
                    </div>

                    {/* التاريخ */}
                    <div className="flex items-start gap-1.5 text-[11px] sm:text-xs text-amber-300 font-semibold">
                      <span className="text-[11px] font-bold text-amber-400 shrink-0">التاريخ:</span>
                      <span className="break-words">{card.date}</span>
                    </div>

                    {/* العنوان */}
                    <div className="flex items-start gap-1.5 text-[11px] sm:text-xs text-stone-300 leading-snug">
                      <span className="text-[11px] font-bold text-rose-400 shrink-0">العنوان:</span>
                      <span className="break-words line-clamp-2" title={card.location}>{card.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2 border-t border-stone-800/80">
                    <button
                      onClick={() => onViewCard(card)}
                      className="py-2 px-1 sm:px-2 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 hover:text-white text-xs font-bold border border-stone-700 hover:border-amber-500/40 flex items-center justify-center gap-1 transition-all cursor-pointer"
                      title="عرض الكرت بحجم كبير"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>عرض</span>
                    </button>

                    <button
                      onClick={() => onBookCard(card)}
                      className="py-2 px-1 sm:px-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 active:scale-95 text-white text-xs font-bold shadow-md shadow-rose-950/40 flex items-center justify-center gap-1 transition-all cursor-pointer"
                      title="احجز الكرت عبر واتساب"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
                      <span>احجز</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
