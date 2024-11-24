import { sendEmail } from '../service/emailService';

sendEmail(
  'soporteasistenteweb@gmail.com',
  'Prueba de correo',
  'Este es un correo de prueba enviado desde Nodemailer.'
)
  .then(() => console.log('Correo enviado exitosamente'))
  .catch((error) => console.error('Error al enviar correo:', error));
