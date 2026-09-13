import { WeddingCard } from '../types';

export const rawUrls = [
  "https://i.postimg.cc/FKXdDJ9B/01.jpg",
  "https://i.postimg.cc/DZ2WKkbT/02.jpg",
  "https://i.postimg.cc/FRDYrWjX/03.jpg",
  "https://i.postimg.cc/KzZKySgS/04.jpg",
  "https://i.postimg.cc/ZRVWb7rh/05.jpg",
  "https://i.postimg.cc/d33LL2BL/06.jpg",
  "https://i.postimg.cc/KjjRRPNr/07.jpg",
  "https://i.postimg.cc/d3fDdhHp/08.jpg",
  "https://i.postimg.cc/0j4rmzWT/09.jpg",
  "https://i.postimg.cc/h4ZXNYDC/10.jpg",
  "https://i.postimg.cc/X7TpYyyg/11.jpg",
  "https://i.postimg.cc/dVrDkt2J/12.jpg",
  "https://i.postimg.cc/yNKxF4jC/13.jpg",
  "https://i.postimg.cc/25x6Gc9Z/14.jpg",
  "https://i.postimg.cc/j5djFHGY/15.jpg",
  "https://i.postimg.cc/RFV0D72b/16.jpg",
  "https://i.postimg.cc/0Q2NBYLj/17.jpg",
  "https://i.postimg.cc/RFs053B6/18.jpg",
  "https://i.postimg.cc/XqrYVVjx/19.jpg",
  "https://i.postimg.cc/nrNcr6Mc/20.jpg",
  "https://i.postimg.cc/Pf7qS8yS/21.jpg",
  "https://i.postimg.cc/4NhxqNFJ/22.jpg",
  "https://i.postimg.cc/W1L1vLQG/23.jpg",
  "https://i.postimg.cc/jS0Sb0Gk/24.jpg",
  "https://i.postimg.cc/sgYDfHrq/25.jpg",
  "https://i.postimg.cc/ZRRTcTyX/26.jpg",
  "https://i.postimg.cc/fb5zm3JD/27.jpg",
  "https://i.postimg.cc/5tp4LH61/28.jpg",
  "https://i.postimg.cc/qRRkLk3h/29.jpg",
  "https://i.postimg.cc/vTxbJ3hq/30.jpg",
  "https://i.postimg.cc/z3m88KPm/31.jpg",
  "https://i.postimg.cc/44Yc4GFq/32.jpg",
  "https://i.postimg.cc/QNvTHz2q/33.jpg",
  "https://i.postimg.cc/yY9S9PK2/34.jpg",
  "https://i.postimg.cc/Vk80FCL1/35.jpg",
  "https://i.postimg.cc/mgyzpgt7/36.jpg",
  "https://i.postimg.cc/wBxtCYmb/37.jpg",
  "https://i.postimg.cc/pd09xcQd/38.jpg",
  "https://i.postimg.cc/KzwR3KsH/39.jpg",
  "https://i.postimg.cc/xChcNkFW/40.jpg",
  "https://i.postimg.cc/rm3KRdPp/41.jpg",
  "https://i.postimg.cc/zvh3CJs8/42.jpg",
  "https://i.postimg.cc/6647J089/43.jpg",
  "https://i.postimg.cc/HW8JD2r8/44.jpg",
  "https://i.postimg.cc/5NcXxCz8/45.jpg",
  "https://i.postimg.cc/kXr2nbSp/46.jpg",
  "https://i.postimg.cc/X7wpXYKH/47.jpg",
  "https://i.postimg.cc/ncvCMhKg/48.jpg",
  "https://i.postimg.cc/JzMtXCP1/49.jpg",
  "https://i.postimg.cc/T3fhbvC1/50.jpg",
  "https://i.postimg.cc/bwpdnf3k/51.jpg",
  "https://i.postimg.cc/4xPyb2S5/52.jpg",
  "https://i.postimg.cc/CKK1vC3P/53.jpg",
  "https://i.postimg.cc/R00FP1kY/54.jpg",
  "https://i.postimg.cc/s22Xn9FR/55.jpg",
  "https://i.postimg.cc/bvvJ6HXd/56.jpg",
  "https://i.postimg.cc/W4f4xFjV/57.jpg",
  "https://i.postimg.cc/25X5gbmW/58.jpg",
  "https://i.postimg.cc/W4f4xFjr/59.jpg",
  "https://i.postimg.cc/PxpqHXr1/60.jpg",
  "https://i.postimg.cc/DZJzhvyL/61.jpg",
  "https://i.postimg.cc/k465CJXY/62.jpg",
  "https://i.postimg.cc/hjktPkfw/63.jpg",
  "https://i.postimg.cc/mDvg2vPW/64.jpg",
  "https://i.postimg.cc/Kz68v61c/65.jpg",
  "https://i.postimg.cc/j5pSdpD7/66.jpg",
  "https://i.postimg.cc/SRcNXg9X/67.jpg",
  "https://i.postimg.cc/KjtvK0TB/68.jpg",
  "https://i.postimg.cc/QCcxBf7Q/69.jpg",
];

const tags = [
  "شعبي راقي",
  "عصري مودرن",
  "فخم كلاسيك",
  "مهرجان فرحتنا",
  "ذهبي ملكي",
  "ورود رومانسية",
  "أصيل شرقي",
];

export interface CardRawDetail {
  weddingTitle: string;
  date: string;
  location: string;
}

export const cardSpecificDetails: CardRawDetail[] = [
  // 01
  {
    weddingTitle: "محمود السبكي (Mahmoud El-Sobke)",
    date: "18 / 9 / 2026",
    location: "ناهيا البلد - قاعة دولفين",
  },
  // 02
  {
    weddingTitle: "فرحة الكومندا (العريس: تامر - تحت إشراف: يوسف الكومندا)",
    date: "الحنة: 25-9-2026 (الجمعة) | الدخلة: 26-9-2026 (السبت)",
    location: "عزبة الوكيل - الميمون - الواسطى",
  },
  // 03
  {
    weddingTitle: "العريس علاء سلامة (فرحة العتاولة)",
    date: "1-10-2026",
    location: "غير محدد (كُتب: انت عليك وصلاتك واحنا علينا انبساطك)",
  },
  // 04
  {
    weddingTitle: "العريس علاء سلامة (فرحة العتاولة)",
    date: "1-10-2026",
    location: "أرض النائب",
  },
  // 05
  {
    weddingTitle: "فرحة الصحاب (العريس: أحمد)",
    date: "25 / 9",
    location: "قاعة الجونة",
  },
  // 06
  {
    weddingTitle: "العريس علاء سلامة (فرحة العتاولة)",
    date: "1 / 10",
    location: "غير محدد (كُتب: انت عليك وصلاتك واحنا علينا انبساطك)",
  },
  // 07
  {
    weddingTitle: "فرحة شيخ العرب (فرحة أبو ناصر)",
    date: "الحنة: 27 / 8 / 2026 | الدخلة: 28 / 8 / 2026",
    location: "عزبه الجمعيه - الواسطى - بني سويف",
  },
  // 08
  {
    weddingTitle: "العريس أحمد ناصر (مليونية الصحاب - فرحة أبو ناصر)",
    date: "الحنة: 27 / 8 | الدخلة: 28 / 8",
    location: "عزبه الجمعيه - الواسطى - بني سويف",
  },
  // 09
  {
    weddingTitle: "مليونية أولاد ضيف (حنكش الصغير وحنكش الكبير)",
    date: "غير مدون بالصورة",
    location: "اللي ميعرفش العنوان هيجي على ريحة الدخان",
  },
  // 10
  {
    weddingTitle: "فرحة الصحاب - فرحة العواقير (برعاية هيثم العقورى)",
    date: "غير مدون بالصورة",
    location: "غير مدون بالصورة",
  },
  // 11
  {
    weddingTitle: "يوسف ابو بدوى (تحت اسم شيخ العرب)",
    date: "يوم الحنة: 3 / 9 / 2026 | يوم الدخلة: 4 / 9 / 2026",
    location: "عزبه الحكيم - الواسطي - بني سويف",
  },
  // 12
  {
    weddingTitle: "الفرحة برعايه حمو (مشار إليه أيضاً باسم طيران)",
    date: "4 / 4 - 3 / 4",
    location: "غير مدون",
  },
  // 13
  {
    weddingTitle: "مليونيه اولاد الصيفى (برعاية حمو وعسليه)",
    date: "غير متوفر بالصورة (قريباً)",
    location: "فرحتنا x حارتنا",
  },
  // 14
  {
    weddingTitle: "العريس ميدو (فرحة أولاد ضيف)",
    date: "الخميس 5 / 8 / 2025",
    location: "قاعة الجونة - بني سويف",
  },
  // 15
  {
    weddingTitle: "احمد جنيدي (فرحة العصابة) والراعي الرسمي بكر جنيدي (برعاية بلال اشرف وعبد العزيز)",
    date: "17 / 9",
    location: "بني سويف - قريه الميمون - عزبه الجمعيه",
  },
  // 16
  {
    weddingTitle: "بيسو",
    date: "الخميس 15 / 8 / 2026",
    location: "عزبه العاصيده - الواسطي - بني سويف",
  },
  // 17
  {
    weddingTitle: "Mohamed Al shref (فرحة اخويا الشريف، فرحة الصحاب)",
    date: "1 / 10 / 2026",
    location: "غير مدون بالبوستر",
  },
  // 18
  {
    weddingTitle: "بيسو (فرحه اخويا بيسو)",
    date: "الجمعة 7 / 8 / 2026",
    location: "عزبه العاصيده - الواسطي - بني سويف",
  },
  // 19
  {
    weddingTitle: "حماده الحمادي (تحت اسم فرحه الحمادي، فرحة اولاد العم)",
    date: "13 / 8",
    location: "عزبه الحماديه - إهناسيا - بني سويف",
  },
  // 20
  {
    weddingTitle: "Mohamed Al shref (فرحه الصحاب)",
    date: "1 / 10 / 2026",
    location: "غير مدون بالبوستر",
  },
  // 21
  {
    weddingTitle: "Iso (فرحه Iso)",
    date: "25 / 10",
    location: "غير محدد (كُتب: فرحتنا x حارتنا)",
  },
  // 22
  {
    weddingTitle: "بيسو (من بيت ابو سلامه)",
    date: "الجمعة 7 / 8 / 2026",
    location: "عزبه العاصيده - الواسطي - بني سويف",
  },
  // 23
  {
    weddingTitle: "الفرحة المنتظرة (دولة كرداسة)",
    date: "8 / 5 و 9 / 5",
    location: "دولة كرداسة",
  },
  // 24
  {
    weddingTitle: "جمعه ابو عادل (فرحه الصحاب)",
    date: "يوم الحنه: 1 / 8 / 2026 | يوم الدخله: 2 / 8 / 2026",
    location: "غير مدون بالبوستر",
  },
  // 25
  {
    weddingTitle: "فرحة البيخايته",
    date: "ثالث يوم العيد",
    location: "عزبه الوكيل البحريه - الواسطى - بني سويف",
  },
  // 26
  {
    weddingTitle: "العريس احمد ناصر (فرحه ابو ناصر، مليونيه الصحاب)",
    date: "يوم الحنه: 27 / 8 / 2026 | يوم الدخله: 28 / 8 / 2026",
    location: "عزبه الجمعيه - الواسطى - بني سويف",
  },
  // 27
  {
    weddingTitle: "فرحه برعايه ابو كامل (فرحه الصحاب)",
    date: "8 / 5 و 9 / 5",
    location: "غير مدون بالبوستر",
  },
  // 28
  {
    weddingTitle: "الفرحة المنتظرة (دولة كرداسة)",
    date: "8 / 5 و 9 / 5",
    location: "دولة كرداسة",
  },
  // 29
  {
    weddingTitle: "فرحه ابو ناصر (فرحه الصحاب)",
    date: "يوم الحنه: 27 / 8 | يوم الدخله: 28 / 8",
    location: "عزبه الجمعيه - الواسطى - بني سويف",
  },
  // 30
  {
    weddingTitle: "العريس (هنفرح بشياكة - فرحتنا في حارتنا)",
    date: "لا يوجد تاريخ محدد في الصورة",
    location: "واللي ميعرفش العنوان هيجي علي ريحه الدخان",
  },
  // 31
  {
    weddingTitle: "الفرحه المنتظره / الدعوه عامه / بدايه جديده",
    date: "8/5 - 9/5",
    location: "غير مدون بالبوستر",
  },
  // 32
  {
    weddingTitle: "الاخوات بتفرح / مليونيه اولاد سعدات / العريس",
    date: "غير مدون بالصورة",
    location: "غير مدون (كُتب: فرحتنا x حارتنا)",
  },
  // 33
  {
    weddingTitle: "افراح الحويطات",
    date: "غير مدون بالصورة",
    location: "غير مدون بالبوستر",
  },
  // 34
  {
    weddingTitle: "فرحة بيسو / فرحة الصحاب / فرحة الموسم / الدعوة عامة",
    date: "الجمعة 7/8/2026",
    location: "عزبه العاصيده - الواسطى - بني سويف",
  },
  // 35
  {
    weddingTitle: "طير أنت / الفرحه برعايه حمو",
    date: "3/4 - 4/4",
    location: "غير مدون بالبوستر",
  },
  // 36
  {
    weddingTitle: "فرحه اولاد الحمادى / الدعوه عامه",
    date: "14/8/2026",
    location: "غير مدون بالبوستر",
  },
  // 37
  {
    weddingTitle: "طير أنت / الفرحة المنتظرة / كباكة",
    date: "موعدنا ثاني يوم العيد",
    location: "OKITIPUPA / VDJ AKUBE",
  },
  // 38
  {
    weddingTitle: "فرحه الصحاب / طير أنت",
    date: "8/5 و 9/5 / 2025",
    location: "AMAOBIA STREET",
  },
  // 39
  {
    weddingTitle: "فرحه الدلوعه",
    date: "يوم الجمعة",
    location: "غير مدون بالبوستر",
  },
  // 40
  {
    weddingTitle: "فرحه ابو ناصر / فرحه الصحاب / الدعوة عامة",
    date: "الحنة يوم 27/8 | الدخلة يوم 28/8",
    location: "عزبه الجمعيه - الواسطى - بني سويف",
  },
  // 41
  {
    weddingTitle: "فرحه ابو ناصر",
    date: "الحنه يوم 27/8 | الدخله يوم 28/8",
    location: "عزبه الجمعيه - الواسطى - بني سويف",
  },
  // 42
  {
    weddingTitle: "فرحة بيسو",
    date: "الجمعة 7/8/2026",
    location: "عزبه العاصيده - الواسطي - بني سويف",
  },
  // 43
  {
    weddingTitle: "فرحة الشنبولى",
    date: "7/10",
    location: "غير مدون بالبوستر",
  },
  // 44
  {
    weddingTitle: "فرحة أبو عوض",
    date: "تالت يوم العيد",
    location: "عزبه الوكيل البحريه - الواسطي - بني سويف",
  },
  // 45
  {
    weddingTitle: "فرحه اولاد الحمادى",
    date: "14/8/2026",
    location: "غير مدون بالبوستر",
  },
  // 46
  {
    weddingTitle: "فرحه الحمادى",
    date: "13/8",
    location: "عزبه الحماديه - اهناسيا - بني سويف",
  },
  // 47
  {
    weddingTitle: "فرحه الصحاب",
    date: "8/5/2025 و 9/5/2025",
    location: "AMAOBIA STREET",
  },
  // 48
  {
    weddingTitle: "فرحه شيخ العرب (العريس محمد حامد)",
    date: "الحنه يوم 3/9/2026 | الدخله يوم 4/9/2026",
    location: "عزبه الحكيم - الواسطى - بني سويف",
  },
  // 49
  {
    weddingTitle: "فرحه الصحاب (العريس جمعه ابو عادل)",
    date: "الحنه يوم 1/8/2026 | الدخله يوم 2/8/2026",
    location: "غير مدون بالبوستر",
  },
  // 50
  {
    weddingTitle: "مليونية الاخوات",
    date: "7/9",
    location: "غير مدون بالبوستر (فرحتنا X حارتنا)",
  },
  // 51
  {
    weddingTitle: "هاني عدلي (العريس)",
    date: "21 / 8 / 2026",
    location: "عزبه العاصيده - الواسطي - بني سويف",
  },
  // 52
  {
    weddingTitle: "فرحه الصحاب",
    date: "يوم الحنه: 13 / 8 / 2026 | يوم الدخله: 14 / 8 / 2026",
    location: "الحنة: عزبه الوكيل - الواسطي | الدخلة: قاعة الجونه - الميمون",
  },
  // 53
  {
    weddingTitle: "فرحة شيخ العرب - فرحة ابو ناصر",
    date: "يوم الحنه: 27 / 8 / 2026 | يوم الدخله: 28 / 8 / 2026",
    location: "عزبه الجمعيه - الواسطى - بني سويف",
  },
  // 54
  {
    weddingTitle: "فرحه الصحاب",
    date: "غير متوفر تاريخ في هذه الصورة",
    location: "غير مدون بالبوستر",
  },
  // 55
  {
    weddingTitle: "Desha El Ghanamawy (المطرب أو الفنان)",
    date: "13 / 09 / 2025",
    location: "بني سويف",
  },
  // 56
  {
    weddingTitle: "فرحة ناصر معجزه - موعدنا 118",
    date: "2025",
    location: "قاعة قمر الزمان",
  },
  // 57
  {
    weddingTitle: "فرحة ابن البلد",
    date: "05 / 12",
    location: "قاعه جولدن بلس",
  },
  // 58
  {
    weddingTitle: "محمد رضا (اخو العروسه)",
    date: "28 / 5 / 2026",
    location: "غير مدون بالبوستر",
  },
  // 59
  {
    weddingTitle: "فارس عسليه",
    date: "يوم الحنه: 26 / 6 / 2026 | يوم الفرح: 27 / 6 / 2026",
    location: "الشرقيه - الارفعيين",
  },
  // 60
  {
    weddingTitle: "Far7t El Desha (فرحة الديشا)",
    date: "17 / 6 / 2025",
    location: "بركة السبع - سوق الخميس",
  },
  // 61
  {
    weddingTitle: "ELGOO / منجة كعبـلة",
    date: "09 / 9 / 2026",
    location: "قاعة روتانا",
  },
  // 62
  {
    weddingTitle: "ELKABOS / KAREM NAAOS OFFICIAL / Mega Star",
    date: "23 - 10 - 2025",
    location: "عزبه سعد بيه - طوخ - القليوبيه",
  },
  // 63
  {
    weddingTitle: "FEKRY ZEEFAN / فكرى زغفان / Fiery",
    date: "غير متوفر تاريخ محدد في الصورة",
    location: "غير مدون بالبوستر",
  },
  // 64
  {
    weddingTitle: "Festival (مهرجان) زرزور",
    date: "غير متوفر تاريخ محدد في الصورة",
    location: "غير مدون بالبوستر",
  },
  // 65
  {
    weddingTitle: "HAMDY ABO TAHA / مهرجان حمدي ابو طه (العريس)",
    date: "رابع يوم العيد",
    location: "غير مدون بالبوستر",
  },
  // 66
  {
    weddingTitle: "فرحة الجزار / ELGAZAR",
    date: "16 / 8",
    location: "الخصوص - عند المطافى",
  },
  // 67
  {
    weddingTitle: "موند يال الحوت / ELHOOT",
    date: "24 / 04 / 2026 إلى 30 / 04 / 2026",
    location: "غير مدون بالبوستر",
  },
  // 68
  {
    weddingTitle: "M O H A M E D / الحوار الكبير / جوله الكوكب (برعايه فرجلو)",
    date: "7 / 2025",
    location: "غير مدون بالبوستر",
  },
  // 69
  {
    weddingTitle: "فرحة الجزار (ELGAZAR)",
    date: "16 / 8",
    location: "الخصوص - عند المطافى",
  },
];

export const weddingCards: WeddingCard[] = rawUrls.map((url, index) => {
  const num = index + 1;
  const formatted = num < 10 ? `0${num}` : `${num}`;
  const tag = tags[index % tags.length];
  const isPopular = [1, 5, 9, 11, 15, 21, 36, 47, 58, 68, 69].includes(num);

  const detail = cardSpecificDetails[index] || {
    weddingTitle: `فرحة العمر - كرت ${formatted}`,
    date: "قريباً",
    location: "بني سويف / مصر",
  };

  return {
    id: num,
    cardNumber: formatted,
    weddingTitle: detail.weddingTitle,
    date: detail.date,
    location: detail.location,
    imageUrl: url,
    tag,
    isPopular,
  };
});
