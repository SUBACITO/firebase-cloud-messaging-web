import {  messaging  } from "./firebase";
import { getToken, onMessage } from 'firebase/messaging'
import {vapidKey} from './fcmConfig'

export async function requestFCMToken() {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    console.log("User từ chối notification");
    return null;
  }

  const registration = await navigator.serviceWorker.ready;

   const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration: registration,
  });

  console.log("FCM Token:", token);
  return token;
}

export function listenForegroundMessage() {
   onMessage(messaging, payload => {
    console.log('✅ [Foreground Message Listener] Nhận được message:', payload);
    if (Notification.permission === 'granted') {
      const notif = new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
      });
    }
  })
  console.log('✅ listenForegroundMessage() đã được setup');
}

