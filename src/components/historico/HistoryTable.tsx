import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HistoryTable = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/tasks', { withCredentials: true })
      .then((res) => {
        console.log(res);
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      {tasks && tasks.length > 0 ? (
        <div className="overflow-auto mt-4">
          <table className="w-full text-center table-auto">
            <thead className="border-b-4 border-blue-900">
              <tr>
                <th scope="col" className="py-2 text-blue-800">CONCEPTO</th>
                <th scope="col" className="py-2 text-blue-800">TIPO TAREA</th>
                <th scope="col" className="py-2 text-blue-800">FECHA INICIO</th>
                <th scope="col" className="py-2 text-blue-800">FECHA DE CIERRE</th>
                <th scope="col" className="py-2 text-blue-800">HORA DE NOTIFICACION</th>
                <th scope="col" className="py-2 text-blue-800">ESTADO</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {tasks.map((task, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{task.concepto}</td>
                  <td className="py-2">{task.tipoTarea}</td>
                  <td className="py-2">{task.fechaInicio}</td>
                  <td className="py-2">{task.fechaCierre}</td>
                  <td className="py-2">{task.horaNotificacion}</td>
                  <td className="py-2">{task.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-8 text-center bg-gray-100 p-4 rounded-lg">
          <p className="text-xl text-gray-600">No dispone de tareas vigentes</p>
          <Link to="/tarea" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Crear Tarea
          </Link>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;