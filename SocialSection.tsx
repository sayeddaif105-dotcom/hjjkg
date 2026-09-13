import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react';

export const SocialSection: React.FC = () => {
  const socialLinks = [
    {
      name: 'TikTok تيك توك',
      handle: '@medo_abn_daif',
      url: 'https://www.tiktok.com/@medo_abn_daif',
      desc: 'فيديوهات حصرية لأجمل كروت الفرح',
      color: 'hover:border-rose-500 hover:shadow-rose-500/20',
      btnBg: 'bg-stone-900 hover:bg-stone-800 text-white',
      icon: (
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      ),
    },
    {
      name: 'Facebook فيسبوك',
      handle: 'ميدو لكروت الأفراح',
      url: 'https://www.facebook.com/share/1HCnfuAgmB/',
      desc: 'تفاعل وشارك صور فرحك معنا',
      color: 'hover:border-blue-500 hover:shadow-blue-500/20',
      btnBg: 'bg-stone-900 hover:bg-stone-800 text-white',
      icon: (
        <svg className="w-7 h-7 fill-current text-blue-500" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'واتساب الأساسي',
      handle: '01121437537',
      url: 'https://wa.me/201121437537',
      desc: 'حجز فوري واستفسارات سريعة',
      color: 'hover:border-emerald-500 hover:shadow-emerald-500/20',
      btnBg: 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200',
      icon: <MessageCircle className="w-7 h-7 text-emerald-400 fill-emerald-400/20" />,
    },
    {
      name: 'واتساب البديل',
      handle: '01142676346',
      url: 'https://wa.me/201142676346',
      desc: 'متاح للرد على مدار الساعة',
      color: 'hover:border-emerald-500 hover:shadow-emerald-500/20',
      btnBg: 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200',
      icon: <MessageCircle className="w-7 h-7 text-emerald-400 fill-emerald-400/20" />,
    },
  ];

  return (
    <section id="social-section" className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs font-bold mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>تواصل ومتابعة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>تابع ميدو ❤️</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-md mx-auto">
            تابع أحدث تصاميم كروت الأفراح وعروضنا المميزة وتواصل معنا مباشرة
          </p>
        </div>

        {/* Big Social Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {socialLinks.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-6 rounded-3xl bg-stone-900/90 border border-stone-800 ${item.color} shadow-xl hover:shadow-2xl flex flex-col items-center text-center transition-all duration-300 group transform hover:-translate-y-1.5`}
            >
              <div className="w-16 h-16 rounded-2xl bg-stone-950 border border-stone-700/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                {item.name}
              </h3>

              <p className="text-xs font-semibold text-amber-300/90 mb-2" dir="ltr">
                {item.handle}
              </p>

              <p className="text-xs text-stone-400 mb-5 leading-relaxed">
                {item.desc}
              </p>

              <span className={`w-full py-2.5 px-4 rounded-xl ${item.btnBg} text-xs font-bold flex items-center justify-center gap-2 border border-stone-700 group-hover:border-amber-400/40 transition-all mt-auto`}>
                <span>زيارة الحساب</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};
