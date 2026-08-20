// Service Worker-এ Firebase v9/v10 Compat লাইব্রেরি ব্যবহার করতে হয়
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// একই Config ডেটা এখানেও বসান
const firebaseConfig = {
  apiKey: "AIzaSyB97aTTVs3LHN0E0EzVTb-xl5AOEYR-SN8",
  authDomain: "acode-fcm-test.firebaseapp.com",
  projectId: "acode-fcm-test",
  storageBucket: "acode-fcm-test.firebasestorage.app",
  messagingSenderId: "1068640714534",
  appId: "1:1068640714534:web:d8c7bf971c4c88a6a4cbe7",
  measurementId: "G-NXY2FGPEZ5"
};

const messaging = firebase.messaging();

// Background Message Handler (যখন ট্যাব বন্ধ বা মিনিমাইজ থাকবে)
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message:", payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "https://via.placeholder.com/192"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});