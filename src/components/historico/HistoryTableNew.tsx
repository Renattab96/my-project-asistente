import React, { useState } from 'react';

const HistoryTableNew: React.FC = () => {
  const tasks = [
    {
      _id: '1',
      accion: 'Hacer la compra',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-02',
      status: 'Pendiente',
      claseTarea: 'Hogar',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana',
    },
    {
      _id: '2',
      accion: 'Reunión con el equipo',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-02',
      status: 'En Curso',
      claseTarea: 'Laboral',
      hora: '14:00',
      descripcion: 'Reunión semanal de seguimiento',
    },
    {
      _id: '3',
      accion: 'Enviar informe',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-02',
      status: 'Finalizada',
      claseTarea: 'Laboral',
      hora: '16:00',
      descripcion: 'Enviar informe mensual al jefe',
    },
  ];

  return (
    <div className="overflow-auto bg-white shadow-2xl flex flex-col items-center rounded-[20px] mx-auto m-2 p-4 bg-white bg-clip-border shadow-3xl dark:!bg-navy-800 dark:text-white dark:!shadow-none">
      <div className="w-full flex justify-end mb-4">
        {/* <select
          className="border-2 border-blue-900 rounded-lg p-2 text-blue-900"
        >
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Curso">En Curso</option>
          <option value="Finalizada">Finalizada</option>
        </select> */}
      </div>
      <table className="table-fixed w-full text-center">
        <thead className="border-b-4 border-blue-900">
          <tr>
            <th scope="col" className="text-2xl text-blue-800">Acción</th>
            <th scope="col" className="text-2xl text-blue-800">Fecha Inicio</th>
            <th scope="col" className="text-2xl text-blue-800">Fecha Vencimiento</th>
            <th scope="col" className="text-2xl text-blue-800">Estado</th>
            <th scope="col" className="text-2xl text-blue-800">Tipo</th>
            <th scope="col" className="text-2xl text-blue-800">Hora</th>
            <th scope="col" className="text-2xl text-blue-800">Descripción</th>
          </tr>
        </thead>
        <tbody className="align-top">
          {tasks.map((task) => (
            <tr key={task._id} className="border-b">
              <td className="p-2">{task.accion}</td>
              <td className="p-2">{task.fechainicio}</td>
              <td className="p-2">{task.fechavencimiento}</td>
              <td className="p-2">{task.status}</td>
              <td className="p-2">{task.claseTarea}</td>
              <td className="p-2">{task.hora}</td>
              <td className="p-2">{task.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTableNew;
