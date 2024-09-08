import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { ITask } from '../../Interfaces/Itask';
import axios from 'axios';
import { Link } from 'react-router-dom';
import axiosInstance from 'src/api/axiosInstance';

const Task = () => {
  const [isPendienteOpen, setIsPendienteOpen] = useState(false);
  const [isEnCursoOpen, setIsEnCursoOpen] = useState(false);
  const [isFinalizadaOpen, setIsFinalizadaOpen] = useState(false);

  const [tasks, setTasks] = useState<ITask[]>([]);

  const userId = 'ID_DEL_USUARIO'; // Reemplaza esto con la forma en que obtienes el ID del usuario

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskType, setTaskType] = useState<'PERSONAL' | 'HOGAR' | 'ADMINISTRATIVA' | 'ACADEMICA' | 'LABORAL'>('PERSONAL');
  const [notificationTime, setNotificationTime] = useState('');

  const togglePendiente = () => setIsPendienteOpen(!isPendienteOpen);
  const toggleEnCurso = () => setIsEnCursoOpen(!isEnCursoOpen);
  const toggleFinalizada = () => setIsFinalizadaOpen(!isFinalizadaOpen);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<ITask[]>('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Partial<ITask> = {
      user: userId,
      title,
      description,
      status,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      taskType,
      notificationTime,
    };
    try {
      await axios.post('http://localhost:5000/api/tasks/create', newTask);
      fetchTasks(); // Actualizar la lista de tareas después de crear una nueva tarea
    } catch (err) {
      console.error('Error al crear la tarea:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row h-[100vh] bg-white">
        
        <div className="w-full lg:w-2/3 mb-2">
          <div className="flex flex-col justify-center items-stretch mt-10 mx-4 lg:mx-10">
            <h1 className="text-3xl font-bold mb-6 border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">
              Tareas
            </h1>
            <div className="overflow-auto bg-white shadow-2xl flex w-full flex-col items-center rounded-[20px] mx-auto m-2 p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
              <div className="dashboard-tab w-full">
                <table className="table-fixed w-full text-center">
                  <thead className="border-b-4 border-blue-900">
                    <tr className="flex sm:flex-row">
                      <th
                        scope="col"
                        className="flex-1 text-sm md:text-lg lg:text-xl text-blue-800 cursor-pointer m-3 text-center whitespace-nowrap"
                        onClick={togglePendiente}
                      >
                        Pendiente  
                      </th>
                      <th
                        scope="col"
                        className="flex-1 text-sm md:text-lg lg:text-xl text-blue-800 cursor-pointer  m-3 text-center whitespace-nowrap"
                        onClick={toggleEnCurso}
                      >
                        En Curso   
                      </th>
                      <th
                        scope="col"
                        className="flex-1 text-sm md:text-lg lg:text-xl text-blue-800 cursor-pointer   m-3 text-center whitespace-nowrap"
                        onClick={toggleFinalizada}
                      >
                        Finalizada   
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    <tr>
                      <td
                        className={`td-css ${
                          isPendienteOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="text-gray-700 td-css grid grid-cols-1 gap-4 p-1 m-1">
                          {/* Filtrar y mostrar tareas pendientes */}
                          {tasks.filter(task => task.status === 'pending').map((task) => (
                            <div key={task._id}>{task.title}</div>
                          ))}
                        </div>
                      </td>
                      <td
                        className={`td-css ${
                          isEnCursoOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="grid grid-cols-1 gap-4 p-1 m-1">
                          {/* Filtrar y mostrar tareas en curso */}
                          {tasks.filter(task => task.status === 'in progress').map((task) => (
                            <div key={task._id}>{task.title}</div>
                          ))}
                        </div>
                      </td>
                      <td
                        className={`td-css ${
                          isFinalizadaOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="grid grid-cols-1 gap-4 p-2 m-2">
                          {/* Filtrar y mostrar tareas finalizadas */}
                          {tasks.filter(task => task.status === 'completed').map((task) => (
                            <div key={task._id}>{task.title}</div>
                          ))}
                        </div>
                      </td>
                    </tr>
                    {tasks.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-2 text-center">
                          <div className="bg-gray-100 p-4 rounded">
                            No se registran tareas
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="tfoot-btn"></tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 mb-2">

          <div className="flex flex-col justify-center items-center mt-10 mx-4 lg:mx-20">
            <form  onSubmit={addTask} className="border-0 border-blue-900 shadow-2xl flex w-full flex-col items-center rounded-[20px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
              <div className="mt-6 mb-3 flex flex-wrap gap-10 md:!gap-5">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xl sm:text-2xl md:text-2xl xl:text-2xl 2xl:text-2xl font-normal text-blue-900">
                    Carga el Tablero
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div>
                  <label className="text-xl text-blue-900" htmlFor="username">
                   Nombre
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    placeholder="Descripcion"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xl text-blue-900" htmlFor="username">
                    Estado
                  </label>
                  <input
                    id="status"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    placeholder="Estado"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xl text-blue-900" htmlFor="username">
                    Fecha Inicio
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xl text-blue-900" htmlFor="username">
                    Fecha Fin
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xl text-blue-900" htmlFor="opciones">
                    Tipo
                  </label>
                  <select
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500"
                    name="tipo-tarea"
                    // placeholder="Seleccione un tipo"
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value as 'PERSONAL' | 'HOGAR' | 'ADMINISTRATIVA' | 'ACADEMICA' | 'LABORAL')}
                  >
                    <option value="Hogar">Hogar</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Academico">Academico</option>
                    <option value="Laboral">Laboral</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
                <div>
                  <label className="text-xl text-blue-900" htmlFor="username">
                    Hora de Notificacion
                  </label>
                  <input
                    id="notificationTime"
                    type="time"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={notificationTime}
                    onChange={(e) => setNotificationTime(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="text-xl text-blue-900"
                    htmlFor="descripcionAdicional"
                  >
                    Descripción Adicional
                  </label>
                  <textarea
                    id="description"
                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                 ></textarea>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-8">
                <div className="flex justify-end mt-6">
                  <button className="px-8 py-3 leading-5 text-white text-2xl transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600">
                    Agregar Tarea
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
