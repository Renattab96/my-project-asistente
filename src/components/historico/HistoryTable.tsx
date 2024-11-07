import { Link } from 'react-router-dom';
import { Task } from '@components/tarea/models/task';
import { TaskStatus } from 'src/models/tasksStatus.model';

interface HistoryTableProps {
  tasks: Task[]
}

const formatDate = (date: Date | string): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) {
    return "Fecha inválida"; // Devuelve un mensaje si la fecha no es válida
  }
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = parsedDate.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

const parseStates = (status: string) => {
  switch (status) {
    case TaskStatus.Pending:
      return "Pendiente";
    case TaskStatus.InProgress:
      return "En Curso";
    case TaskStatus.Completed:
      return "Finalizado";
    case TaskStatus.Archived:
      return "Eliminado";
    default:
      return "Estado desconocido";
  }
}


const HistoryTable = ({ tasks }: HistoryTableProps) => {
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
                <th scope="col" className="py-2 text-blue-800">ESTADO</th>
                <th scope="col" className="py-2 text-blue-800">HORA DE NOTIFICACION</th>
                <th scope="col" className="py-2 text-blue-800">DESCRIPCIÓN</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {tasks.map((task, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{task.accion}</td>
                  <td className="py-2">{task.claseTarea}</td>
                  <td className="py-2">{formatDate(task.fechainicio)}</td>
                  <td className="py-2">{formatDate(task.fechavencimiento)}</td>
                  <td className="py-2">{parseStates(task.status)}</td>
                  <td className="py-2">{task.hora}</td>
                  <td className="py-2">{task.descripcion}</td>
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