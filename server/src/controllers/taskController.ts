import { Request, Response } from 'express';
import Task from '../models/Task'; // Asegúrate de importar tu modelo de tarea
import User from '../models/User';
import { AuthenticatedRequest } from '../middleware/AuthenticatedRequest'; // Importa la interfaz AuthenticatedRequest
import { Types } from 'mongoose';
import { sendEmail } from '../service/emailService';




// Crear nueva tarea
export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, description, startDate, endDate, taskType, notificationTime } = req.body;
    const userId = req.user!; // Obtén el ID del usuario logueado desde el middleware de autenticación
    const newTask = new Task({
      user: userId,
      title,
      description,
      status: 'pending',
      history: [{ status: 'pending', date: new Date() }],
      startDate,
      endDate,
      taskType,
      notificationTime,
    });
    const savedTask = await newTask.save();
    // **Agregar el ID de la tarea al array `tasks` del usuario**
    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

    // **Enviar correo de notificación al usuario**
    const user = await User.findById(userId); // Obtener los datos del usuario
    if (user && user.email) {
      await sendEmail(
        user.email, // Dirección de correo del usuario
        'Nueva Tarea Creada',
        `Se ha creado una nueva tarea con el título "${savedTask.title}" y fecha límite ${savedTask.endDate}.`
      );
    }

    // Enviar la respuesta al cliente con la tarea creada
    res.status(201).json(savedTask);
    // res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};
// Actualizar tarea
export const modifyTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { taskId } = req.params; // ID de la tarea a actualizar
  const updates = req.body; // Nuevos datos de la tarea

  try {
    // Actualizar la tarea y devolver la tarea actualizada
    const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    // Si no se encuentra la tarea, responder con un error 404
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // **Enviar correo de notificación al usuario**
    const user = await User.findById(task.user).select('email username');
    if (user && user.email) {
      try {
        await sendEmail(
          user.email,
          'Tarea Actualizada',
          `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Tarea Actualizada</h2>
            <p>Hola <b>${user.username}</b>,</p>
            <p>La tarea <b>${task.title}</b> ha sido actualizada con los siguientes detalles:</p>
            <ul>
              <li><b>Fecha de inicio:</b> ${task.startDate}</li>
              <li><b>Fecha de fin:</b> ${task.endDate}</li>
              <li><b>Estado:</b> ${task.status}</li>
            </ul>
            <p>Saludos,<br>El equipo de gestión de tareas.</p>
          </div>
          `
        );
      } catch (emailError) {
        console.error('Error al enviar el correo:', emailError);
      }
    }

    // Responder con la tarea actualizada
    return res.json(task);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};


// Obtener tareas por usuario
export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!; // Obtén el ID del usuario logueado desde el middleware de autenticación
    const tasks = await Task.find({ user: userId }).populate('user', 'username email'); // Agregar populate para detalles del usuario
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Error al obtener las tareas');
  }
};
// Eliminar tarea  metodo dado de baja  solo aplica al backend 
export const borrarTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error al eliminar la tarea');
  }
};
// elistar las tareas en general 
export const getTasksAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//archivar tarea 
export const archiveTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    // Validar si el taskId es un ObjectId válido
    if (!Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid Task ID' });
    }

    // Buscar y actualizar la tarea
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        status: 'archivado',
        $push: { history: { status: 'archivado', date: new Date() } },
      },
      { new: true } // Para devolver la tarea actualizada
    );

    // Verificar si la tarea existe
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
     // Buscar el usuario asociado a la tarea
     const user = await User.findById(updatedTask.user);
     if (!user || !user.email) {
       return res.status(400).json({ message: 'Usuario no autenticado o email no disponible' });
     }
       // Enviar correo de notificación
       try {
        await sendEmail(
          user.email,
          'Tarea Archivada',
          `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Tarea Archivada</h2>
            <p>Hola <b>${user.username}</b>,</p>
            <p>La tarea <b>${updatedTask.title}</b> ha sido archivada con los siguientes detalles:</p>
            <ul>
              <li><b>Título:</b> ${updatedTask.title}</li>
              <li><b>Fecha de archivo:</b> ${new Date().toLocaleDateString()}</li>
            </ul>
            <p style="margin-top: 20px;">Saludos,<br>El equipo de gestión de tareas.</p>
          </div>
          `
        );
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        // Si prefieres no interrumpir la ejecución, no envíes un error 500 aquí.
      }

    res.status(200).json({ message: 'Tarea archivada exitosamente', task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al archivar la tarea' });
  }
};
// Obtener el usuario y sus tareas
export const getUserWithTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'tasks', // Asegúrate de que el campo 'tasks' esté correctamente referenciado en el modelo de usuario
        populate: { path: 'user', select: 'username role' } // Aquí seleccionamos los campos 'username' y 'role' del usuario
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el usuario y sus tareas');
  }
};



// NO APLICA INTEGRACION A ESTE CONTROLLER
// eliminar tarea esto solo es para el backend no requiere integracion 
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    // Enviar notificación al usuario
    await sendEmail(
      req.user.email,
      'Tarea Eliminada',
      `La tarea "${task.title}" ha sido eliminada.`
    );
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Crear las tareas 
export const createTarea = async (req: Request, res: Response): Promise<void> => {
  const { title, description, startDate, endDate, taskType, notificationTime } = req.body;
  try {
    const newTask = new Task({
      user: req.user,
      title,
      description,
      status: 'pending',
      history: [{ status: 'pending', date: new Date() }],
      startDate,
      endDate,
      taskType,
      notificationTime
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Actualizar las tareas 
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.params;
  const { title, description, status, startDate, endDate, taskType, notificationTime } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) {
      task.status = status;
      task.history.push({ status, date: new Date() });
    }
    if (startDate) task.startDate = startDate;
    if (endDate) task.endDate = endDate;
    if (taskType) task.taskType = taskType;
    if (notificationTime) task.notificationTime = notificationTime;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

