import React from 'react';
import { Heart, PhoneCall, ExternalLink, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800/80 pt-16 pb-24 md:pb-12 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-stone-800/80 text-right">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-black text-white">
                ميدو <span className="text-rose-500">❤️</span>
              </span>
            </div>
            <p className="text-amber-400 font-bold text-base mb-1">
              اعمل كرت فرحك بالحب
            </p>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              كروت أفراح شعبية وعصرية - منصتكم الأولى في مصر لاختيار وتصميم وطباعة كروت الفرح بأعلى جودة وأرقى لمسة شعبية وعصرية تبهج القلوب.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-base mb-4 border-r-2 border-amber-400 pr-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#home');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#cards-gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#cards-gallery');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  كروت الأفراح
                </a>
              </li>
              <li>
                <a
                  href="#booking-section"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#booking-section');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  احجز كرتك
                </a>
              </li>
              <li>
                <a
                  href="#social-section"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#social-section');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels & Contact */}
          <div>
            <h4 className="text-white font-black text-base mb-4 border-r-2 border-rose-500 pr-2">
              قنوات التواصل
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/share/1HCnfuAgmB/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Facebook (فيسبوك)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 mr-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@medo_abn_daif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-rose-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>TikTok (تيك توك)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 mr-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201121437537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>WhatsApp 1: 01121437537</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201142676346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>WhatsApp 2: 01142676346</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright notice & credits */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center gap-2 text-amber-300 font-black text-sm sm:text-base">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>إعداد وتقديم حمو ابن ضيف</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-stone-400 font-bold text-xs sm:text-sm tracking-wide">
            جميع الحقوق محفوظة ©حمو الجعفري <span dir="ltr" className="text-amber-400 font-mono">01142676346</span>
          </p>
          <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-1">
            <span>صُنع بحب لأجمل ليالي العمر والفرحة الكبيرة</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
