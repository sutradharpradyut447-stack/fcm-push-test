import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js";

// আপনার Firebase Console থেকে Config ডেটা বসান
const firebaseConfig = {
  apiKey: "AIzaSyB97aTTVs3LHN0E0EzVTb-xl5AOEYR-SN8",
  authDomain: "acode-fcm-test.firebaseapp.com",
  projectId: "acode-fcm-test",
  storageBucket: "acode-fcm-test.firebasestorage.app",
  messagingSenderId: "1068640714534",
  appId: "1:1068640714534:web:d8c7bf971c4c88a6a4cbe7",
  measurementId: "G-NXY2FGPEZ5"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const btnPermission = document.getElementById("btn-permission");
const tokenBox = document.getElementById("token-box");

btnPermission.addEventListener("click", async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // সার্ভিস ওয়ার্কার রেজিস্টার করা
      const registration = await navigator.serviceWorker.register("./firebase-messaging-sw.js");
      
      // VAPID Key বসিয়ে টোকেন নেওয়া
      const currentToken = await getToken(messaging, {
        vapidKey: "BKVS5AvgSACcLUhz3A7b1ChOd0NGueFhiLn6sdAuQniAvo_Qecr1SsCJvAfmS4zE3Km-MPehfQ-AjavU335G-rI",
        serviceWorkerRegistration: registration
      });

      if (currentToken) {
        tokenBox.value = currentToken;
        console.log("FCM Token:", currentToken);
      } else {
        alert("No registration token available. Request permission to generate one.");
      }
    } else {
      alert("Notification permission denied!");
    }
  } catch (error) {
    console.error("Error getting token:", error);
    alert("Error: " + error.message);
  }
});

// Foreground Message Handler (যখন ওয়েবসাইট খোলা থাকবে)
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  alert(`${payload.notification.title}\n${payload.notification.body}`);
});