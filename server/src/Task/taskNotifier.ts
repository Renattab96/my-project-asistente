import Task from '../models/Task';
import { sendEmail } from '../service/emailService';
import User from '../models/User';

const checkDeadlines = async () => {
  const now = new Date();

  // Buscar tareas pendientes cuya fecha límite esté cercana (dentro de 1 hora)
  const tasks = await Task.find({
    status: 'pending',
    endDate: { $lte: new Date(now.getTime() + 3600000) }, // 1 hora antes de la fecha límite
    notificationSent: false,
  });

  tasks.forEach(async (task) => {
    // Buscar el usuario asociado a la tarea
    const user = await User.findById(task.user);
    if (user && user.email) {
      // Enviar el correo de notificación
      await sendEmail(
        user.email,
        'Recordatorio de tarea',
        `Tu tarea "${task.title}" está próxima a vencer. Por favor, revisa antes de ${task.endDate}.`
      );
    }

    // Marcar la tarea como notificada para evitar duplicados
    task.notificationSent = true;
    await task.save();
  });
};

// Ejecutar cada minuto
setInterval(checkDeadlines, 60000); // Verifica cada 1 minuto
