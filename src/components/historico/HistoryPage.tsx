
import React, { useEffect, useState } from 'react';
import Navbar from '@components/Navbar/Navbar';
import HistoryTable from '../historico/HistoryTable';
import { Task } from '@components/tarea/models/task';
import { getTasks } from '@components/tarea/services/getTasks.services';
import { mapApiResponseToTask } from '@components/tarea/models/mappersTask';
import { TaskStatus } from 'src/models/tasksStatus.model';
import { Button } from '@components/ui/Button';

const HistoryPage: React.FC = () => {
  const [data, setData] = useState<Task[]>([]);
  const [type, setType] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const fetchData = async () => {
    const response = await getTasks();
    let tasks = mapApiResponseToTask(response);
    tasks.reverse();
    if (type) {
      tasks = tasks.filter((task) => task.claseTarea === type)
    }
    if (status) {
      tasks = tasks.filter((task) => task.status === status)
    }
    setData(tasks);
  }

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <Navbar />
      <div className=" container p-4">
        <h1 className="text-3xl font-bold mb-4">Historico</h1>
        <div className=" mx-auto p-6 grid md:grid-cols-[40%,40%,15%] gap-4 items-end">
          <div>
            <h3 className='text-lg text-blue-500'>Tipo</h3>
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 rounded-xl"
              name="tipo-tarea"
              onChange={(e) => setType(e.target.value)} value={type}>
              <option value="">Todos</option>
              <option value="HOGAR">Hogar</option>
              <option value="ADMINISTRATIVA">Administrativo</option>
              <option value="ACADEMICA">Academico</option>
              <option value="LABORAL">Laboral</option>
              <option value="PERSONAL">Personal</option>
            </select>
          </div>
          <div>
            <h3 className='text-lg text-blue-500'>Estado</h3>
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 rounded-xl"
              name="tipo-tarea"
              onChange={(e) => setStatus(e.target.value)} value={status}>
              <option value="">Todos</option>
              <option value={TaskStatus.Pending}>Pendiente</option>
              <option value={TaskStatus.InProgress}>En Curso</option>
              <option value={TaskStatus.Completed}>Finalizado</option>
              <option value={TaskStatus.Archived}>Eliminado</option>
            </select>
          </div>

          <Button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
            BUSCAR
          </Button>
        </div>
        <div className="overflow-x-auto">
          <HistoryTable tasks={data} />
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
