export interface WeddingCard {
  id: number;
  cardNumber: string; // "01", "02", ...
  weddingTitle: string; // عنوان الفرحة
  date: string; // التاريخ
  location: string; // عنوان الفرح
  imageUrl: string;
  tag: string;
  isPopular?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface BookingFormValues {
  cardNumber: string;
  groomName: string;
  weddingDate: string;
  weddingAddress: string;
  weddingSlogan: string;
  phone: string;
  notes?: string;
  whatsappTarget: '01121437537' | '01142676346';
}

export interface SiteStats {
  totalVisits: number;
  onlineNow: number;
}
