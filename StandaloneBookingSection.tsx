import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Calendar,
  MapPin,
  Phone,
  Sparkles,
  Send,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingCards } from '../data/cardsData';

interface StandaloneBookingSectionProps {
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const StandaloneBookingSection: React.FC<StandaloneBookingSectionProps> = ({ addToast }) => {
  const [selectedCardNumber, setSelectedCardNumber] = useState('01');
  const [groomName, setGroomName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [weddingAddress, setWeddingAddress] = useState('');
  const [weddingSlogan, setWeddingSlogan] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [whatsappTarget, setWhatsappTarget] = useState<'01121437537' | '01142676346'>('01121437537');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

  const selectedCard = weddingCards.find((c) => c.cardNumber === selectedCardNumber) || weddingCards[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groomName.trim()) {
      addToast('يرجى إدخال اسم العريس', 'error');
      return;
    }

    if (!phone.trim()) {
      addToast('يرجى إدخال رقم التواصل', 'error');
      return;
    }

    setLoading(true);
    const orderPayload = {
      cardNumber: selectedCardNumber,
      cardTitle: selectedCard.weddingTitle,
      groomName: groomName.trim(),
      weddingDate: weddingDate.trim(),
      weddingAddress: weddingAddress.trim(),
      weddingSlogan: weddingSlogan.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      whatsappTarget,
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      setLastSubmittedData(orderPayload);
      setSubmitted(true);

      // Celebrate with confetti
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#f59e0b', '#ec4899', '#ffffff'],
      });

      addToast('تم استلام طلبك بنجاح ❤️', 'success');
    } catch {
      addToast('فشل حفظ الطلب، يرجى المحاولة مرة أخرى', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    if (!lastSubmittedData) return;
    const messageText = `💌 *طلب حجز كرت فرح*\n\n🖼 *الكرت المختار:* ${lastSubmittedData.cardTitle || lastSubmittedData.cardNumber}\n👤 *اسم العريس:* ${lastSubmittedData.groomName}\n📅 *تاريخ الفرح:* ${lastSubmittedData.weddingDate || 'قريباً'}\n📍 *عنوان الفرح:* ${lastSubmittedData.weddingAddress || 'لم يحدد'}\n❤️ *شعار الفرح:* ${lastSubmittedData.weddingSlogan || 'فرحتنا الكبيرة'}\n📞 *رقم التواصل:* ${lastSubmittedData.phone}${lastSubmittedData.notes ? `\n📝 *الملاحظات:* ${lastSubmittedData.notes}` : ''}`;

    const targetNumber = lastSubmittedData.whatsappTarget === '01142676346' ? '201142676346' : '201121437537';
    const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReset = () => {
    setSubmitted(false);
    setGroomName('');
    setWeddingDate('');
    setWeddingAddress('');
    setWeddingSlogan('');
    setPhone('');
    setNotes('');
  };

  return (
    <section id="booking-section" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>حجز سهل وسريع</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <span>💍 احجز كرتك الآن</span>
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            سجل بيانات فرحك وسنتواصل معك فورا لتجهيز أجمل كرت يليق بليلتكم السعيدة
          </p>
        </div>

        {/* Main Booking Container */}
        <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)] mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
                  تم استلام طلبك ❤️
                </h3>

                <p className="text-amber-300 text-lg sm:text-xl font-medium max-w-md mx-auto mb-6 leading-relaxed">
                  سنتواصل معك لإتمام تصميم كرت فرحك وتأكيد كافة التفاصيل في أسرع وقت.
                </p>

                {lastSubmittedData && (
                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-right w-full max-w-md mb-8 text-xs sm:text-sm space-y-1.5 text-stone-300">
                    <p><span className="text-amber-400 font-bold">الكرت:</span> {lastSubmittedData.cardTitle}</p>
                    <p><span className="text-amber-400 font-bold">اسم العريس:</span> {lastSubmittedData.groomName}</p>
                    <p><span className="text-amber-400 font-bold">تاريخ الفرح:</span> {lastSubmittedData.weddingDate || 'قريباً'}</p>
                    <p><span className="text-amber-400 font-bold">رقم التواصل:</span> {lastSubmittedData.phone}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <button
                    onClick={handleOpenWhatsApp}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer transition-transform transform hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>متابعة الطلب عبر واتساب</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="py-3.5 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-bold text-sm border border-stone-700 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>حجز كرت آخر</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5 text-right"
              >
                {/* 1. اختار كرت من الكروت */}
                <div>
                  <label className="block text-xs font-bold text-amber-300 mb-2">
                    اختار كرت من الكروت <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedCardNumber}
                    onChange={(e) => setSelectedCardNumber(e.target.value)}
                    className="w-full py-3.5 px-4 bg-stone-950 border border-amber-500/50 focus:border-amber-400 rounded-xl text-white font-bold text-sm focus:outline-none"
                  >
                    {weddingCards.map((card) => (
                      <option key={card.id} value={card.cardNumber} className="bg-stone-900 text-white">
                        {card.weddingTitle} ({card.date})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. اسم العريس */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    اسم العريس <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="مثال: محمود السيد"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      className="w-full py-3 pr-11 pl-4 bg-stone-950/90 border border-stone-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none"
                    />
                    <Heart className="w-4 h-4 text-rose-500 absolute top-3.5 right-4" />
                  </div>
                </div>

                {/* 3. تاريخ الفرح & شعار الفرح */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">تاريخ الفرح</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="مثال: الخميس 15 نوفمبر"
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className="w-full py-3 pr-11 pl-4 bg-stone-950/90 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-sm focus:outline-none"
                      />
                      <Calendar className="w-4 h-4 text-stone-500 absolute top-3.5 right-4" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">شعار / اسم الفرح</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="مثال: فرحة العمر / الليلة الكبيرة"
                        value={weddingSlogan}
                        onChange={(e) => setWeddingSlogan(e.target.value)}
                        className="w-full py-3 pr-11 pl-4 bg-stone-950/90 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-sm focus:outline-none"
                      />
                      <Sparkles className="w-4 h-4 text-amber-400 absolute top-3.5 right-4" />
                    </div>
                  </div>
                </div>

                {/* 4. عنوان الفرح & رقم التواصل */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">عنوان الفرح (القاعة / العنوان)</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="مثال: دار المشاة - القاهرة"
                        value={weddingAddress}
                        onChange={(e) => setWeddingAddress(e.target.value)}
                        className="w-full py-3 pr-11 pl-4 bg-stone-950/90 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-sm focus:outline-none"
                      />
                      <MapPin className="w-4 h-4 text-stone-500 absolute top-3.5 right-4" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-300 mb-1.5">
                      رقم التواصل <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="010XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full py-3 pr-11 pl-4 bg-stone-950/90 border border-stone-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none text-left"
                        dir="ltr"
                      />
                      <Phone className="w-4 h-4 text-rose-500 absolute top-3.5 right-4" />
                    </div>
                  </div>
                </div>

                {/* 5. ملاحظات إضافية */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">ملاحظات إضافية</label>
                  <textarea
                    rows={2}
                    placeholder="أي تفاصيل ترغب بإضافتها أو الاستفسار عنها..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full py-2.5 px-4 bg-stone-950/90 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-xs focus:outline-none resize-none"
                  />
                </div>

                {/* 6. رقم واتساب للتواصل */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-2">
                    اختر رقم واتساب المفضل للتواصل:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setWhatsappTarget('01121437537')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        whatsappTarget === '01121437537'
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>الأساسي: 01121437537</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWhatsappTarget('01142676346')}
                      className={`py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        whatsappTarget === '01142676346'
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>البديل: 01142676346</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-stone-800 text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-12 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-lg shadow-2xl shadow-rose-950/60 inline-flex items-center justify-center gap-3 transform hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5 rotate-180" />
                        <span>إرسال طلب الحجز</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
