import React, { useState, useEffect, useCallback } from 'react';
import { NewsTicker } from './components/NewsTicker';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CardsGallery } from './components/CardsGallery';
import { AdBanner } from './components/AdBanner';
import { StandaloneBookingSection } from './components/StandaloneBookingSection';
import { VisitorCounterSection } from './components/VisitorCounterSection';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { CardLightbox } from './components/CardLightbox';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { User, WeddingCard } from './types';
import { weddingCards } from './data/cardsData';

export default function App() {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Modals state
  const [lightboxCard, setLightboxCard] = useState<WeddingCard | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [bookingCard, setBookingCard] = useState<WeddingCard | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Toast Notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Check existing session token on mount
  useEffect(() => {
    const token = localStorage.getItem('medo_auth_token');
    const savedUser = localStorage.getItem('medo_user');

    if (token && savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        // Verify with server
        fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Invalid token');
          })
          .then((data) => {
            setCurrentUser(data.user);
            localStorage.setItem('medo_user', JSON.stringify(data.user));
          })
          .catch(() => {
            // Expired or invalid token
            localStorage.removeItem('medo_auth_token');
            localStorage.removeItem('medo_user');
            setCurrentUser(null);
            setShowAuthModal(true);
          });
      } catch {
        setShowAuthModal(true);
      }
    } else {
      // First visit: Show Welcome / Login screen as required
      setShowAuthModal(true);
    }
  }, []);

  const handleAuthSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    localStorage.setItem('medo_auth_token', token);
    localStorage.setItem('medo_user', JSON.stringify(user));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('medo_auth_token');
    localStorage.removeItem('medo_user');
    setShowAuthModal(true);
    addToast('تم تسجيل الخروج بنجاح. يرجى تسجيل الدخول للمتابعة ❤️', 'info');
  };

  const handleOpenCardLightbox = (card: WeddingCard) => {
    setLightboxCard(card);
    setIsLightboxOpen(true);
  };

  const handleOpenBookingModal = (card: WeddingCard) => {
    setBookingCard(card);
    setIsBookingModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-rose-500 selection:text-white relative">
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Welcome & Authentication Modal (Mandatory to enter the platform) */}
      <AuthModal
        isOpen={!currentUser || showAuthModal}
        onSuccess={handleAuthSuccess}
        onClose={() => {
          if (currentUser) {
            setShowAuthModal(false);
          }
        }}
        addToast={addToast}
      />

      {/* Golden Scrolling News Ticker at top of page */}
      <NewsTicker />

      {/* Main Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          key={currentUser ? currentUser.username : 'guest'}
          onExploreCards={() => scrollToSection('#cards-gallery')}
          onBookNow={() => scrollToSection('#booking-section')}
        />

        {/* Non-intrusive tasteful Promo Banner / Advertisement */}
        <AdBanner />

        {/* Wedding Cards Gallery */}
        <CardsGallery
          onViewCard={handleOpenCardLightbox}
          onBookCard={handleOpenBookingModal}
        />

        {/* Standalone Booking Section */}
        <StandaloneBookingSection addToast={addToast} />

        {/* Real Visitor Counter Section */}
        <VisitorCounterSection />

        {/* Social Media Channels */}
        <SocialSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Bottom Bar */}
      <MobileBottomNav
        onOpenBooking={() => scrollToSection('#booking-section')}
      />

      {/* Card Lightbox Modal */}
      <CardLightbox
        card={lightboxCard}
        allCards={weddingCards}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onBookCard={handleOpenBookingModal}
      />

      {/* WhatsApp Booking Modal */}
      <WhatsAppBookingModal
        card={bookingCard}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        addToast={addToast}
      />

    </div>
  );
}
