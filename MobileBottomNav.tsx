import React from 'react';
import { Home, Image as ImageIcon, CalendarCheck, MessageCircle, Heart } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenBooking: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenBooking }) => {
  const scrollTo = (id: string) => {
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800/90 py-2 px-3 flex items-center justify-around shadow-[0_-5px_20px_rgba(0,0,0,0.6)]">
      
      {/* Home */}
      <button
        onClick={() => scrollTo('#home')}
        className="flex flex-col items-center gap-1 text-stone-400 hover:text-amber-400 py-1 px-2 transition-colors min-w-[56px] cursor-pointer"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold">الرئيسية</span>
      </button>

      {/* Gallery */}
      <button
        onClick={() => scrollTo('#cards-gallery')}
        className="flex flex-col items-center gap-1 text-stone-400 hover:text-amber-400 py-1 px-2 transition-colors min-w-[56px] cursor-pointer"
      >
        <ImageIcon className="w-5 h-5" />
        <span className="text-[10px] font-bold">الكروت</span>
      </button>

      {/* Center Booking Highlight */}
      <button
        onClick={onOpenBooking}
        className="flex flex-col items-center -mt-5 cursor-pointer"
      >
        <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-rose-950/80 border-2 border-stone-950 hover:scale-105 active:scale-95 transition-transform">
          <Heart className="w-6 h-6 fill-white" />
        </div>
        <span className="text-[10px] font-bold text-amber-300 mt-0.5">احجز كرتك</span>
      </button>

      {/* Stats */}
      <button
        onClick={() => scrollTo('#stats-section')}
        className="flex flex-col items-center gap-1 text-stone-400 hover:text-amber-400 py-1 px-2 transition-colors min-w-[56px] cursor-pointer"
      >
        <CalendarCheck className="w-5 h-5" />
        <span className="text-[10px] font-bold">الزوار</span>
      </button>

      {/* Direct WhatsApp */}
      <a
        href="https://wa.me/201121437537"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 text-emerald-400 hover:text-emerald-300 py-1 px-2 transition-colors min-w-[56px]"
      >
        <MessageCircle className="w-5 h-5 fill-emerald-500/20" />
        <span className="text-[10px] font-bold">واتساب</span>
      </a>

    </div>
  );
};
