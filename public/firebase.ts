// /src/firebase.ts

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCu_P7-QcXRz4E5UvdT0NqsHcGrWP1Tnwg",
  authDomain: "asistente-web-22323.firebaseapp.com",
  projectId: "asistente-web-22323",
  storageBucket: "asistente-web-22323.appspot.com",
  messagingSenderId: "855996265641",
  appId: "1:855996265641:web:d520e2466b8c5dff03e5b8",
  measurementId: "G-MECLML93XB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Cloud Messaging y solicita el token
const messaging = getMessaging(app);

export const requestForToken = async (setTokenFound: (token: boolean) => void) => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'your-public-vapid-key' });
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Envía el token al backend
      await fetch('/api/users/update-device-token', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceToken: currentToken }),
      });
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
    setTokenFound(false);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
