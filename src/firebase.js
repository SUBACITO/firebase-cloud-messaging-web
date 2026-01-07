import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
import { firebaseConfig } from "./fcmConfig";


export function initFirebase() {
  return initializeApp(firebaseConfig)
}

export function getFirebaseMessaging() {
  return getMessaging()
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

export { messaging }