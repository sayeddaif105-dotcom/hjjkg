import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Heart, Calendar, MapPin, Phone, FileText, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingCard, BookingFormValues } from '../types';

interface WhatsAppBookingModalProps {
  card: WeddingCard | null;
  isOpen: boolean;
  onClose: () => void;
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const WhatsAppBookingModal: React.FC<WhatsAppBookingModalProps> = ({
  card,
  isOpen,
  onClose,
  addToast,
}) => {
  const [formData, setFormData] = useState<BookingFormValues>({
    cardNumber: card ? card.cardNumber : '01',
    groomName: '',
    weddingDate: '',
    weddingAddress: '',
    weddingSlogan: '',
    phone: '',
    notes: '',
    whatsappTarget: '01121437537',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (card) {
      setFormData((prev) => ({
        ...prev,
        cardNumber: card.cardNumber,
      }));
    }
  }, [card]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.groomName.trim()) {
      addToast('يرجى كتابة اسم العريس', 'error');
      return;
    }

    if (!formData.phone.trim()) {
      addToast('يرجى كتابة رقم الهاتف للتواصل', 'error');
      return;
    }

    setLoading(true);

    try {
      // 1. Send order to backend (safe database + Telegram admin notification)
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // 2. Build the WhatsApp message format strictly as specified
      const messageText = `💌 *طلب حجز كرت فرح*\n\n🖼 *رقم الكرت:* ${formData.cardNumber}\n👤 *اسم العريس:* ${formData.groomName}\n📅 *تاريخ الفرح:* ${formData.weddingDate || 'قريباً'}\n📍 *عنوان الفرح:* ${formData.weddingAddress || 'لم يحدد'}\n❤️ *شعار الفرح:* ${formData.weddingSlogan || 'فرحتنا الكبيرة'}\n📞 *رقم التواصل:* ${formData.phone}${formData.notes ? `\n📝 *الملاحظات:* ${formData.notes}` : ''}`;

      const targetNumber = formData.whatsappTarget === '01142676346' ? '201142676346' : '201121437537';
      const encodedMsg = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMsg}`;

      // Trigger Confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#f59e0b', '#ec4899', '#ffffff'],
      });

      addToast('تم تجهيز طلبك! جارٍ فتح واتساب لإتمام الحجز بالحب ❤️', 'success');

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      onClose();
    } catch {
      addToast('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg my-6 bg-stone-900 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl text-right"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header with Thumbnail */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-stone-800">
            {card && (
              <img
                src={card.imageUrl}
                alt={card.weddingTitle}
                className="w-16 h-20 object-cover rounded-xl border border-amber-500/40 shadow-md shrink-0"
              />
            )}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{card?.weddingTitle || `كرت رقم ${formData.cardNumber}`}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                حجز كرت الفرح بالحب ❤️
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                املأ بيانات فرحك وسيتم إرسال الطلب مباشرة للإدارة وواتساب
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Card number selection */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">رقم الكرت</label>
              <input
                type="text"
                required
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="w-full py-2.5 px-3 bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl text-amber-300 font-black text-sm focus:outline-none"
              />
            </div>

            {/* Groom Name */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                اسم العريس <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد مصطفى"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full py-2.5 pr-10 pl-3 bg-stone-950 border border-stone-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none"
                />
                <Heart className="w-4 h-4 text-rose-500 absolute top-3.5 right-3" />
              </div>
            </div>

            {/* Wedding Date & Slogan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">تاريخ الفرح</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: الجمعة 20 أكتوبر"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full py-2.5 pr-10 pl-3 bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-sm focus:outline-none"
                  />
                  <Calendar className="w-4 h-4 text-stone-500 absolute top-3.5 right-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">شعار / اسم الفرح</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: فرحة العمر / عائلة ..."
                    value={formData.weddingSlogan}
                    onChange={(e) => setFormData({ ...formData, weddingSlogan: e.target.value })}
                    className="w-full py-2.5 pr-10 pl-3 bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-sm focus:outline-none"
                  />
                  <Sparkles className="w-4 h-4 text-amber-400 absolute top-3.5 right-3" />
                </div>
              </div>
            </div>

            {/* Address & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">عنوان الفرح (القاعة / المكان)</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: قاعة اللوتس - طنطا"
                    value={formData.weddingAddress}
                    onChange={(e) => setFormData({ ...formData, weddingAddress: e.target.value })}
                    className="w-full py-2.5 pr-10 pl-3 bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-sm focus:outline-none"
                  />
                  <MapPin className="w-4 h-4 text-stone-500 absolute top-3.5 right-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  رقم الهاتف للتواصل <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="010XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full py-2.5 pr-10 pl-3 bg-stone-950 border border-stone-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none text-left"
                    dir="ltr"
                  />
                  <Phone className="w-4 h-4 text-rose-500 absolute top-3.5 right-3" />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">ملاحظات إضافية (العدد، تفاصيل خاصة)</label>
              <div className="relative">
                <textarea
                  rows={2}
                  placeholder="أي طلبات خاصة في التصميم، عدد الكروت المطلوب، إلخ..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full py-2 px-3 bg-stone-950 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-xs focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* WhatsApp Target Number Chooser */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-stone-300 mb-2">
                اختر رقم واتساب المستلم:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, whatsappTarget: '01121437537' })}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                    formData.whatsappTarget === '01121437537'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span className="text-[10px] text-stone-400">الرقم الأساسي</span>
                  <span>01121437537</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, whatsappTarget: '01142676346' })}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                    formData.whatsappTarget === '01142676346'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span className="text-[10px] text-stone-400">الرقم البديل</span>
                  <span>01142676346</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-base shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>إرسال الطلب عبر واتساب ({formData.whatsappTarget})</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
