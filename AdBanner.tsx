import React, { useState } from 'react';
import { Sparkles, Megaphone, Tag, ArrowLeft, X, Gift, PhoneCall } from 'lucide-react';

interface AdBannerProps {
  onAction?: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({ onAction }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="إعلان مميز" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900/90 to-rose-950/70 border border-amber-500/40 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          
          {/* Ad Label & Offer Text */}
          <div className="flex items-center gap-3.5 w-full md:w-auto text-right">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-stone-950 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-black border border-amber-500/30 flex items-center gap-1">
                  <Megaphone className="w-3 h-3 text-amber-400" />
                  <span>إعلان دعائي مميز</span>
                </span>
                <span className="text-stone-400 text-xs font-semibold">
                  • عرض حصري لعرسان الموسم
                </span>
              </div>

              <h4 className="text-white text-sm sm:text-base font-black leading-snug">
                🎁 احجز كرت فرحك الآن واحصل على <span className="text-amber-400 font-extrabold underline decoration-amber-400 underline-offset-4">فيديو دعوة فرح ديجيتال متحرك مجاناً</span>!
              </h4>
              <p className="text-stone-300 text-xs mt-0.5">
                تنسيق ومتابعة فورية مع حمو وميدو ابن ضيف لجميع مراكز بني سويف والقاهرة وجميع المحافظات
              </p>
            </div>
          </div>

          {/* Action and dismiss */}
          <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
            <a
              href="https://wa.me/201142676346?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B9%D8%B1%D8%B6%20%D9%83%D8%B1%D9%88%D8%AA%20%D8%A7%D9%84%D8%A3%D9%81%D8%B1%D8%A7%D8%AD%20%D9%88%D8%A7%D9%84%D9%81%D9%8A%D8%AF%D9%8A%D9%88%20%D8%A7%D9%84%D9%87%D8%AF%D9%8A%D8%A9"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md shadow-emerald-950/40 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>استفد بالعرض الآن</span>
            </a>

            <button
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="إخفاء الإعلان"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </aside>
  );
};
