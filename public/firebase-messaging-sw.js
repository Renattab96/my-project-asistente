// /public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCu_P7-QcXRz4E5UvdT0NqsHcGrWP1Tnwg",
  authDomain: "asistente-web-22323.firebaseapp.com",
  projectId: "asistente-web-22323",
  storageBucket: "asistente-web-22323.appspot.com",
  messagingSenderId: "855996265641",
  appId: "1:855996265641:web:d520e2466b8c5dff03e5b8",
  measurementId: "G-MECLML93XB"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
