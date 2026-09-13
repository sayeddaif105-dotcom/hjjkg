import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Image as ImageIcon, CalendarCheck, Award, Crown, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreCards: () => void;
  onBookNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreCards, onBookNow }) => {
  const fullText =
    "اختار التصميم اللي يعجبك من بين تصميمات جاهزة متنوعة، واحجز كرتك بأسهل وأسرع طريقة مع ميدو";
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    // Gentle initial pause of 400ms upon site entry, then smooth deliberate typing ("براحة")
    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        currentIndex++;
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
        } else {
          setIsTypingDone(true);
          clearInterval(timer);
        }
      }, 70); // 70ms per character for an elegant, calm, human handwriting rhythm
    }, 400);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-22 overflow-hidden">
      {/* Refreshed Royal Golden and Rose Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-rose-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-gradient-to-r from-amber-600/10 via-yellow-500/10 to-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top celebratory royal badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-stone-900/90 via-amber-950/60 to-stone-900/90 border border-amber-500/50 text-amber-300 text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(245,158,11,0.2)] mb-6"
        >
          <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>منصة كروت الأفراح الشعبية والعصرية الأولى في مصر</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.2] mb-6 max-w-4xl mx-auto drop-shadow-xl"
        >
          اعمل كرت فرحك <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-rose-400 bg-clip-text text-transparent inline-flex items-center gap-3">
            بالحب
            <Heart className="w-9 h-9 sm:w-14 sm:h-14 fill-rose-500 text-rose-500 inline-block animate-bounce drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
          </span>
        </motion.h1>

        {/* Subtitle with Real-time Slow Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="min-h-[80px] sm:min-h-[95px] flex items-center justify-center max-w-3xl mx-auto mb-8 px-4"
        >
          <div className="relative w-full bg-gradient-to-r from-stone-900/95 via-amber-950/40 to-stone-900/95 py-4 sm:py-5 px-6 sm:px-8 rounded-2xl sm:rounded-3xl border border-amber-400/35 shadow-[0_6px_35px_rgba(245,158,11,0.18)] backdrop-blur-md text-right">
            <p className="text-amber-100 text-base sm:text-xl md:text-2xl font-bold leading-relaxed inline">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 inline-block ml-2 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{displayedText}</span>
              {/* Blinking Luxury Gold Cursor */}
              <span
                className={`inline-block w-1 sm:w-1.5 h-5 sm:h-7 bg-amber-400 mr-1.5 align-middle rounded shadow-[0_0_12px_#f59e0b] ${
                  isTypingDone ? 'animate-pulse' : 'animate-ping'
                }`}
              />
            </p>
          </div>
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10"
        >
          <button
            onClick={onExploreCards}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-stone-950 font-black text-lg shadow-[0_0_30px_rgba(245,158,11,0.35)] flex items-center justify-center gap-3 transform hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer"
          >
            <ImageIcon className="w-5 h-5 text-stone-950" />
            <span>شاهد كروت الأفراح</span>
          </button>

          <button
            onClick={onBookNow}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900/90 hover:bg-stone-800/90 text-amber-300 font-bold text-lg border-2 border-amber-500/40 hover:border-amber-400 shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer"
          >
            <CalendarCheck className="w-5 h-5 text-amber-400" />
            <span>احجز كرتك الآن</span>
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-stone-400 text-xs sm:text-sm font-medium"
        >
          <span className="flex items-center gap-1.5 text-amber-300/90">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>تصميمات جاهزة حصرية</span>
          </span>
          <span className="flex items-center gap-1.5 text-rose-300/90">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>فرحتك مع ميدو ابن ضيف</span>
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300/90">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>خدمة سريعة ومضمونة</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
};
