// 1. استدعاء الميزات التي نحتاجها من موقع Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. مفاتيح الربط الخاصة بمشروعك (استبدل هذه البيانات بالبيانات الخاصة بك من موقع Firebase Console)
const firebaseConfig = {
  apiKey: "ضع_هنا_API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// 3. تشغيل خدمات الفايربيس
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 4. تحديد عناصر الصفحة لربطها بالكود
const loginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');

const publishBtn = document.getElementById('publish-btn');
const newsTitle = document.getElementById('news-title');
const newsContent = document.getElementById('news-content');
const newsList = document.getElementById('news-list');


// ==================== ميزة تسجيل الدخول بـ Google ====================

// عند الضغط على زر تسجيل الدخول
loginBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("تم تسجيل الدخول:", result.user);
    })
    .catch((error) => {
      alert("حدث خطأ في تسجيل الدخول: " + error.message);
    });
});

// عند الضغط على زر تسجيل الخروج
logoutBtn.addEventListener('click', () => {
  signOut(auth);
});

// ملاحقة حالة المستخدم (هل هو مسجل دخول أم لا؟)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // إذا كان المستخدم مسجل دخول
    userInfo.innerHTML = `
      <p>مرحباً بك: <b>${user.displayName}</b></p>
      <img src="${user.photoURL}" width="45" style="border-radius: 50%;">
    `;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    // إذا كان المستخدم غير مسجل
    userInfo.innerHTML = '<p>أنت غير مسجل الدخول حالياً.</p>';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
});


// ==================== ميزة إضافة ونشر الأخبار ====================

// عند الضغط على زر نشر التحديث
publishBtn.addEventListener('click', async () => {
  const title = newsTitle.value.trim();
  const content = newsContent.value.trim();

  if (!title || !content) {
    alert("يرجى ملء كافة الحقول (العنوان والتفاصيل)!");
    return;
  }

  try {
    // إرسال الخبر لقاعدة البيانات إلى مجلد اسمه "news"
    await addDoc(collection(db, "news"), {
      title: title,
      content: content,
      createdAt: new Date()
    });

    alert("تم نشر التحديث بنجاح!");
    newsTitle.value = '';
    newsContent.value = '';
  } catch (error) {
    alert("حدث خطأ أثناء النشر: " + error.message);
  }
});


// ==================== ميزة عرض الأخبار تلقائياً ====================

// ترتيب الأخبار بحيث يظهر الأحدث في الأعلى
const newsQuery = query(collection(db, "news"), orderBy("createdAt", "desc"));

// الاستماع المستمر لأي خبر جديد يتم إضافته
onSnapshot(newsQuery, (snapshot) => {
  newsList.innerHTML = ''; // مسح القائمة القديمة لتحديثها

  if (snapshot.empty) {
    newsList.innerHTML = '<p>لا توجد أخبار أو تحديثات حالياً.</p>';
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();

    // إنشاء كارت لكل خبر
    const item = document.createElement('div');
    item.style.borderBottom = '1px solid #eee';
    item.style.padding = '10px 0';

    item.innerHTML = `
      <h3 style="margin:0 0 5px 0; color:#0284c7;">${data.title}</h3>
      <p style="margin:0 0 5px 0;">${data.content}</p>
      <small style="color: gray;">${data.createdAt ? data.createdAt.toDate().toLocaleString('ar-EG') : ''}</small>
    `;

    newsList.appendChild(item);
  });
});
