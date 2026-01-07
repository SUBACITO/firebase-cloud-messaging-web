// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "skibidi",
  authDomain: "skibidi",
  projectId: "skibidi",
  storageBucket: "skibidi",
  messagingSenderId: "skibidi",
  appId: "skibidi",
  measurementId: "skibidi"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

console.log('⚙️ Service Worker ACTIVE - Firebase initialized');

// Debug: Log khi nhận push event
self.addEventListener('push', (event) => {
  console.log('📨 Push event nhận được:', event.data?.json());
});

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('🔔 [FCM Background Message]', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || '/icon.png',
    badge: '/badge.png',
    tag: payload.notification.tag || 'notification',
    data: payload.data,
    requireInteraction: true
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.link || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
