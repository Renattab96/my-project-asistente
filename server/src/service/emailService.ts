import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Función genérica para enviar correos
export const sendEmail = async (to: string, undefined: undefined, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: `"Asistente Web" <${process.env.SMTP_USER}>`, // Dirección del remitente
      to,
      subject,
      text,
      // html, // OpcionalS
    });
    console.log(`Correo enviado a: ${to}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error; // Opcional: Lanza el error para que el controlador lo maneje
  }
};
