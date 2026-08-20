importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

// ঠিক আগের মতো একই Config এখানেও বসান
firebase.initializeApp({
  apiKey: "AIzaSyB97aTTVs3LHN0E0EzVTb-xl5AOEYR-SN8",
  authDomain: "acode-fcm-test.firebaseapp.com",
  projectId: "acode-fcm-test",
  storageBucket: "acode-fcm-test.firebasestorage.app",
  messagingSenderId: "1068640714534",
  appId: "1:1068640714534:web:d8c7bf971c4c88a6a4cbe7",
  measurementId: "G-NXY2FGPEZ5"
};

const messaging = firebase.messaging();

// Background Push Notification Handler
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://via.placeholder.com/192"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
