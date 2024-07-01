// // /src/utils/notificationUtil.ts
// import admin from './firebaseAdmin';

// export const sendPushNotification = (token: string, message: string) => {
//   const payload = {
//     notification: {
//       title: 'Nueva Notificación',
//       body: message,
//     },
//   };

//   admin.messaging().sendToDevice(token, payload)
//     .then(response => {
//       console.log('Notificación enviada:', response);
//     })
//     .catch(error => {
//       console.error('Error al enviar notificación:', error);
//     });
// };
