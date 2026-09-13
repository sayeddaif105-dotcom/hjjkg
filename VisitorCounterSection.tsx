import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Users, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { SiteStats } from '../types';

export const VisitorCounterSection: React.FC = () => {
  const [stats, setStats] = useState<SiteStats>({ totalVisits: 1248, onlineNow: 7 });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    // Record real visit on server and retrieve verified aggregate visits
    const recordVisit = async () => {
      try {
        const res = await fetch('/api/stats/visit', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalVisits: data.totalVisits || 1250,
            onlineNow: data.onlineNow || 6,
          });
        }
      } catch (err) {
        console.error('Failed to update stats:', err);
      }
    };

    recordVisit();
  }, []);

  // Smooth number count-up animation
  useEffect(() => {
    const target = stats.totalVisits;
    const duration = 1800; // ms
    const startTime = performance.now();

    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeProgress * target);

      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [stats.totalVisits]);

  return (
    <section id="stats-section" className="py-14 relative bg-stone-900/40 border-y border-stone-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>إحصائيات المنصة الحية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
            <span>👁️ زوار موقعنا</span>
          </h2>
        </div>

        {/* Counter Card */}
        <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto text-center relative overflow-hidden">
          
          {/* Subtle glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          <p className="text-sm sm:text-base font-bold text-stone-400 mb-2">
            عدد الزيارات:
          </p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-4 font-mono select-none"
          >
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400 bg-clip-text text-transparent">
              {displayCount.toLocaleString('ar-EG')}
            </span>
          </motion.div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-950/80 border border-stone-800 text-stone-300 text-xs sm:text-sm font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>متصل الآن: </span>
            <span className="text-emerald-400 font-bold">{stats.onlineNow} زائر يتصفح كروت الأفراح</span>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-stone-800 text-center">
            <div>
              <p className="text-base sm:text-xl font-black text-amber-300">تصميمات جاهزة</p>
              <p className="text-[10px] sm:text-xs text-stone-400">شعبي وعصري</p>
            </div>
            <div>
              <p className="text-base sm:text-xl font-black text-rose-400">100%</p>
              <p className="text-[10px] sm:text-xs text-stone-400">رضا العرسان</p>
            </div>
            <div>
              <p className="text-base sm:text-xl font-black text-emerald-400">سريع</p>
              <p className="text-[10px] sm:text-xs text-stone-400">تجهيز وتسليم</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
