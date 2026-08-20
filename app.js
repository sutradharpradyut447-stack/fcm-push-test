import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js";

// আপনার প্রজেক্টের আসল তথ্য এখানে বসান
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

const btnToken = document.getElementById("btn-token");
const tokenBox = document.getElementById("token-box");

btnToken.addEventListener("click", async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register("./firebase-messaging-sw.js");
      
      const currentToken = await getToken(messaging, {
        vapidKey: "BKVS5AvgSACcLUhz3A7b1ChOd0NGueFhiLn6sdAuQniAvo_Qecr1SsCJvAfmS4zE3Km-MPehfQ-AjavU335G-rI", // ধাপ ১-এর জেনারেট করা VAPID Key
        serviceWorkerRegistration: registration
      });

      if (currentToken) {
        tokenBox.value = currentToken;
        alert("FCM Token Generated Successfully!");
      } else {
        alert("No registration token available.");
      }
    } else {
      alert("Notification permission denied!");
    }
  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }
});

// Foreground Handler
onMessage(messaging, (payload) => {
  alert(`${payload.notification.title}\n${payload.notification.body}`);
});      } else {
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
