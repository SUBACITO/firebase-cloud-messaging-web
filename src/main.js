import { initFirebase } from "./firebase";
import { requestFCMToken, listenForegroundMessage } from "./fcm.js";

initFirebase();

// Register Service Worker ONCE
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(() => console.log('✅ Service Worker registered'))
    .catch(err => console.error('❌ SW register failed', err));
}

document.getElementById("enableNoti").onclick = async () => {
  const statusEl = document.getElementById("status");

  try {
    const token = await requestFCMToken();

    if (!token) throw new Error('No token');

    console.log("📨 Gửi token về server:", token);
    statusEl.className = 'success';
    statusEl.innerHTML = `<strong>✓ Thành công!</strong><br>${token.slice(0, 50)}...`;
  } catch (err) {
    console.error(err);
    statusEl.className = 'error';
    statusEl.innerHTML = '<strong>✗ Lỗi!</strong><br>Không lấy được token';
  }

  statusEl.style.display = 'block';
};

listenForegroundMessage();
