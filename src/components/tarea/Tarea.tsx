// import React, { useState, useEffect } from 'react';
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
// import axios from 'axios';
// import moment from 'moment';
// import BtnTareaProgress from './BtnTareaProgress';
// import BtnTareaCompleta from './BtnTareaCompleta';
// import BtnTareaEliminada from './BtnTareaEliminada';

const Task = () => {
  // // Variables de estado
  // const [accion, setAccion] = useState('');
  // const [status, setStatus] = useState('uno');
  // const [fechainicio, setinicio] = useState('');
  // const [fechavencimiento, setFechavencimiento] = useState('');
  // const [claseTarea, settipotarea] = useState('');
  // const [hora, sethora] = useState('');
  // const [descripcion, setDescripcion] = useState(''); // Nueva variable de estado para el textarea
  // // const [projects, setProjects] = useState([]);

  // const fetchTareas = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/tareas');
  //     setProjects(response.data);
  //   } catch (error) {
  //     console.error('Error al obtener las tareas:', error);
  //   }
  // };

  // const addProyecto = (e) => {
  //   e.preventDefault();
  //   const nuevaTarea = {
  //     accion,           // Usar el valor del estado
  //     fechainicio,      // Usar el valor del estado
  //     fechavencimiento, // Usar el valor del estado
  //     status,           // Usar el valor del estado
  //     claseTarea,       // Usar el valor del estado
  //     hora ,        // Usar el valor del estado
  //     descripcion       // Usar el valor del estado
  //   };
  //   axios.post(`http://localhost:8000/api/creartarea`, nuevaTarea)
  //     .then((res) => {
  //       console.log(res);
  //       fetchTareas(); // Llamar a fetchTareas para actualizar la lista de tareas después de crear una nueva tarea
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   fetchTareas();
  // }, []);




  const [isPendienteOpen, setIsPendienteOpen] = useState(false);
  const [isEnCursoOpen, setIsEnCursoOpen] = useState(false);
  const [isFinalizadaOpen, setIsFinalizadaOpen] = useState(false);

  const togglePendiente = () => setIsPendienteOpen(!isPendienteOpen);
  const toggleEnCurso = () => setIsEnCursoOpen(!isEnCursoOpen);
  const toggleFinalizada = () => setIsFinalizadaOpen(!isFinalizadaOpen);

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
                        <div className="text-gray-700 td-css grid grid-cols-1 gap- p-1 m-1">
                          {/* Contenido de la sección "Pendiente" */}
                        </div>
                      </td>
                      <td
                        className={`td-css ${
                          isEnCursoOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="grid grid-cols-1 gap-4 p-1 m-1">
                          <p>Aqui se Gestiona el Axio se mueve las card</p>
                          {/* Contenido de la sección "En Curso" */}
                        </div>
                      </td>
                      <td
                        className={`td-css ${
                          isFinalizadaOpen ? "block" : "hidden"
                        }`}
                      >
                        <div className="grid grid-cols-1 gap-4 p-2 m-2">
                          {/* Contenido de la sección "Finalizada" */}
                        </div>
                      </td>
                    </tr>
                    {true && (
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
            <form className="border-0 border-blue-900 shadow-2xl flex w-full flex-col items-center rounded-[20px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
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
                    Descripcion
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    placeholder="Descripcion"
                  />
                </div>
                <div>
                  <label className="text-xl text-blue-900" htmlFor="username">
                    Estado
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    placeholder="Estado"
                  />
                </div>
                <div>
                  <label className="text-xl text-blue-900" htmlFor="username">
                    Fecha Inicio
                  </label>
                  <input
                    id="username"
                    type="date"
                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label className="text-xl text-blue-900" htmlFor="username">
                    Fecha Fin
                  </label>
                  <input
                    id="username"
                    type="date"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
                    id="username"
                    type="time"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
                    id="descripcionAdicional"
                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
