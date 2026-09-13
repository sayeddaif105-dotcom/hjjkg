import React from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

export const NewsTicker: React.FC = () => {
  const announcements = [
    "✨ أهلاً ومرحباً بكم في موقع تصميماتي - الموقع يحتوي على جميع وأحسن وأفخم كروت الأفراح الشعبية والعصرية",
    "تعال عندنا واعمل كرت فرحك بالحب مع ميدو ابن ضيف ❤️",
    "تصميمات حصرية بأعلى جودة وجاهزة للطباعة والمشاركة على واتساب وفيسبوك فوراً ✨",
    "أسعار خاصة لجميع أهالينا الكرام وخصومات حصرية على جميع الكروت في الموسم الجديد ✨",
    "احجز كرتك بأسهل وأسرع طريقة في ثوانٍ معدودة عبر الواتساب مباشرة ✨",
    "الفرحة فرحتنا ونخدمكم بكل حب وتقدير مع ميدو ابن ضيف ❤️ ✨",
    "أهلاً بكم في عالم الإبداع والتميز - كل يوم تصميمات جديدة ومميزة لتليق بليلة العمر ✨",
  ];

  const fullTickerContent = announcements.join("   ❖   ");

  return (
    <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs sm:text-sm py-2 px-1 overflow-hidden shadow-lg border-b border-amber-300 sticky top-0 z-50 select-none">
      {/* Full width edge-to-edge continuous scrolling ticker starting from the very beginning of the line */}
      <div className="w-full overflow-hidden whitespace-nowrap flex items-center">
        <div className="inline-flex shrink-0 animate-marquee hover:[animation-play-state:paused] cursor-default font-black tracking-wide items-center">
          <span className="mx-4 inline-flex items-center gap-2">
            <span>{fullTickerContent}</span>
          </span>
          <span className="mx-4 inline-flex items-center gap-2">
            <span>{fullTickerContent}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

