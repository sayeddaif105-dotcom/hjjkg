import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User as UserIcon, Mail, Lock, Eye, EyeOff, Heart, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onSuccess: (user: User, token: string) => void;
  onClose: () => void;
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onSuccess, onClose, addToast }) => {
  const [authMode, setAuthMode] = useState<'welcome' | 'register' | 'login'>('welcome');

  // Register Form
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Loading & Error states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regUsername.trim()) {
      setErrorMessage('يرجى إدخال اسم المستخدم');
      return;
    }
    if (!validateEmail(regEmail.trim())) {
      setErrorMessage('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: regUsername.trim(),
          email: regEmail.trim(),
          password: regPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل إنشاء الحساب');
      }

      addToast(`أهلاً بك يا ${data.user.username}! تم إنشاء حسابك بنجاح ❤️`, 'success');
      onSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateEmail(loginEmail.trim())) {
      setErrorMessage('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    if (!loginPassword) {
      setErrorMessage('يرجى إدخال كلمة المرور');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل تسجيل الدخول');
      }

      addToast(`مرحباً بعودتك يا ${data.user.username} ❤️`, 'success');
      onSuccess(data.user, data.token);
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل تسجيل الدخول، تأكد من بياناتك');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-md my-8 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] text-right"
        >
          {/* Decorative subtle ambient lights */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header Brand */}
          <div className="text-center mb-6 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 text-white shadow-lg shadow-rose-900/40 mb-3">
              <Heart className="w-8 h-8 fill-white animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span>ميدو</span>
              <span className="text-rose-500 text-2xl">❤️</span>
            </h1>
            <p className="text-amber-300/90 font-medium text-base sm:text-lg mt-1 tracking-wide">
              اعمل كرت فرحك بالحب
            </p>
            <p className="text-stone-400 text-xs mt-1">كروت أفراح شعبية وعصرية مميزة لأجمل ليالي العمر</p>
          </div>

          {/* Mode Switcher / Content */}
          <AnimatePresence mode="wait">
            {authMode === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-2xl bg-stone-800/50 border border-stone-700/50 text-center">
                  <p className="text-amber-300 text-sm font-bold leading-relaxed mb-1">
                    أهلاً بك في منصة كروت الأفراح "ميدو" ❤️
                  </p>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    يرجى تسجيل الدخول أو إنشاء حساب جديد للدخول وتصفح كروت الفرح وحجز كرتك:
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  <button
                    onClick={() => {
                      setErrorMessage('');
                      setAuthMode('register');
                    }}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-base shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    <span>مستخدم جديد (إنشاء حساب)</span>
                  </button>

                  <button
                    onClick={() => {
                      setErrorMessage('');
                      setAuthMode('login');
                    }}
                    className="w-full py-3.5 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700/80 text-stone-100 font-bold text-base border border-stone-700 hover:border-amber-500/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <UserIcon className="w-5 h-5 text-stone-300" />
                    <span>مستخدم قديم (تسجيل الدخول)</span>
                  </button>
                </div>
              </motion.div>
            )}

            {authMode === 'register' && (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-stone-200 font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-500" />
                    إنشاء حساب جديد
                  </span>
                  <button
                    type="button"
                    onClick={() => setAuthMode('welcome')}
                    className="text-xs text-stone-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>رجوع</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-200 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Username */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">اسم المستخدم</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="مثال: أحمد محمد"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      className="w-full py-2.5 pr-10 pl-4 bg-stone-950/80 border border-stone-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none transition-colors"
                    />
                    <UserIcon className="w-4 h-4 text-stone-500 absolute top-3.5 right-3.5" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">البريد الإلكتروني</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full py-2.5 pr-10 pl-4 bg-stone-950/80 border border-stone-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none transition-colors"
                    />
                    <Mail className="w-4 h-4 text-stone-500 absolute top-3.5 right-3.5" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">كلمة المرور</label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      placeholder="لا تقل عن 6 أحرف"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full py-2.5 pr-10 pl-11 bg-stone-950/80 border border-stone-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none transition-colors"
                    />
                    <Lock className="w-4 h-4 text-stone-500 absolute top-3.5 right-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="p-1 text-stone-400 hover:text-white absolute top-2.5 left-2.5 cursor-pointer"
                      title={showRegPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <input
                      type={showRegConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="أعد كتابة كلمة المرور"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full py-2.5 pr-10 pl-11 bg-stone-950/80 border border-stone-700 focus:border-rose-500 rounded-xl text-white text-sm focus:outline-none transition-colors"
                    />
                    <Lock className="w-4 h-4 text-stone-500 absolute top-3.5 right-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                      className="p-1 text-stone-400 hover:text-white absolute top-2.5 left-2.5 cursor-pointer"
                      title={showRegConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showRegConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-base shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>إنشاء حساب</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-1 text-xs text-stone-400">
                  لديك حساب بالفعل؟{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage('');
                      setAuthMode('login');
                    }}
                    className="text-amber-400 hover:underline font-bold cursor-pointer"
                  >
                    تسجيل الدخول
                  </button>
                </div>
              </motion.form>
            )}

            {authMode === 'login' && (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-stone-200 font-bold text-lg flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-amber-500" />
                    تسجيل الدخول
                  </span>
                  <button
                    type="button"
                    onClick={() => setAuthMode('welcome')}
                    className="text-xs text-stone-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>رجوع</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-200 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">البريد الإلكتروني</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full py-2.5 pr-10 pl-4 bg-stone-950/80 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-sm focus:outline-none transition-colors"
                    />
                    <Mail className="w-4 h-4 text-stone-500 absolute top-3.5 right-3.5" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">كلمة المرور</label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      placeholder="أدخل كلمة المرور"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full py-2.5 pr-10 pl-11 bg-stone-950/80 border border-stone-700 focus:border-amber-500 rounded-xl text-white text-sm focus:outline-none transition-colors"
                    />
                    <Lock className="w-4 h-4 text-stone-500 absolute top-3.5 right-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="p-1 text-stone-400 hover:text-white absolute top-2.5 left-2.5 cursor-pointer"
                      title={showLoginPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-base shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserIcon className="w-5 h-5" />
                      <span>تسجيل الدخول</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-1 text-xs text-stone-400">
                  ليس لديك حساب؟{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage('');
                      setAuthMode('register');
                    }}
                    className="text-rose-400 hover:underline font-bold cursor-pointer"
                  >
                    إنشاء حساب جديد
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
