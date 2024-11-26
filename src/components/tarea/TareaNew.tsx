import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import moment from 'moment';
import BtnTareaProgress from './BtnTareaProgress';
import BtnTareaCompleta from './BtnTareaCompleta';
import BtnTareaEliminada from './BtnTareaEliminada';
import { getTasks } from './services/getTasks.services';
import { mapApiResponseToTask, mapTaskToResponseToTask } from './models/mappersTask';
import { Task } from './models/task';
import { TaskStatus } from 'src/models/tasksStatus.model';
import { TaskPercentage } from './models/taskCount';
import { toast } from 'react-toastify';
import { createTask } from './services/createTask.services';
import { TaskCreate } from './models/taskCreate';
import { useDispatch } from 'react-redux';
import { setId } from 'src/redux/states/user.state';
import BtnTareaPendiente from './BtnTareaPendiente';
import BtnTareaEditar from './BtnTareaEditar';

const TareaNew: React.FC = () => {
  // const [projects, setProjects] = useState<Task[]>([
  //   {
  //     _id: '1',
  //     accion: 'Estudiar para la capacitacion de ISTQB',
  //     fechainicio: '2024-03-01',
  //     fechavencimiento: '2024-10-20',
  //     status: 'uno',
  //     claseTarea: 'Academico',
  //     hora: '10:00',
  //     descripcion: 'Comprar comida para la semana'
  //   },
  //   {
  //     _id: '2',
  //     accion: 'Seguir la lectura de Kaizen',
  //     fechainicio: '2024-03-01',
  //     fechavencimiento: '2024-10-20',
  //     status: 'uno',
  //     claseTarea: 'Academico',
  //     hora: '10:00',
  //     descripcion: 'Comprar comida para la semana'
  //   }, {
  //     _id: '3',
  //     accion: 'Preparar la Pretesis 4 ',
  //     fechainicio: '2024-07-01',
  //     fechavencimiento: '2024-07-09',
  //     status: 'dos',
  //     claseTarea: 'Hogar',
  //     hora: '10:00',
  //     descripcion: 'Comprar comida para la semana'
  //   }, {
  //     _id: '4',
  //     accion: 'Vender la Tv Smart 43',
  //     fechainicio: '2024-07-01',
  //     fechavencimiento: '2024-07-07',
  //     status: 'tres',
  //     claseTarea: 'Hogar',
  //     hora: '10:00',
  //     descripcion: 'Comprar comida para la semana'
  //   }, {
  //     _id: '5',
  //     accion: 'Gestion de Pagos del Mes ',
  //     fechainicio: '2024-07-01',
  //     fechavencimiento: '2024-07-15',
  //     status: 'dos',
  //     claseTarea: 'Hogar',
  //     hora: '10:00',
  //     descripcion: 'Comprar comida para la semana'
  //   }, {
  //     _id: '6',
  //     accion: 'Ver Furiosa en el cine ',
  //     fechainicio: '2024-07-01',
  //     fechavencimiento: '2024-07-02',
  //     status: 'dos',
  //     claseTarea: 'Hogar',
  //     hora: '10:00',
  //     descripcion: 'Comprar comida para la semana'
  //   },
  //   {
  //     _id: '7',
  //     accion: 'Reunión con el equipo',
  //     fechainicio: '2024-07-01',
  //     fechavencimiento: '2024-07-02',
  //     status: 'tres',
  //     claseTarea: 'Laboral',
  //     hora: '14:00',
  //     descripcion: 'Reunión semanal de seguimiento'
  //   },
  //   {
  //     _id: '8',
  //     accion: 'Enviar informe',
  //     fechainicio: '2024-07-01',
  //     fechavencimiento: '2024-07-02',
  //     status: 'tres',
  //     claseTarea: 'Laboral',
  //     hora: '16:00',
  //     descripcion: 'Enviar informe mensual al jefe'
  //   },
  //   {
  //     _id: '9',
  //     accion: 'Comprar pipeta para perro',
  //     fechainicio: '2024-06-29',
  //     fechavencimiento: '2024-06-30',
  //     status: 'tres',
  //     claseTarea: 'Hogar',
  //     hora: '18:00',
  //     descripcion: 'Compra de la pipeta de perro grande y compra de purina de la marca prontodog de 25 kl'
  //   },
  //   {
  //     _id: '10',
  //     accion: 'Ingles CPK Elementary 1 ',
  //     fechainicio: '2024-03-01',
  //     fechavencimiento: '2024-10-20',
  //     status: 'dos',
  //     claseTarea: 'Academico',
  //     hora: '10:00',
  //     descripcion: 'Comprar comida para la semana'
  //   },
  //   {
  //     _id: '11',
  //     accion: 'Ingles CPK Elementary 2 ',
  //     fechainicio: '2024-03-01',
  //     fechavencimiento: '2024-10-20',
  //     status: 'uno',
  //     claseTarea: 'Academico',
  //     hora: '10:00',
  //     descripcion: 'Comprar comida para la semana'
  //   },
  // ]);

  const dispatch = useDispatch();

  const [projects, setProjects] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [accion, setAccion] = useState<string>('');
  // const [status, setStatus] = useState<string>('');
  const [fechainicio, setinicio] = useState<string>("");
  const [fechavencimiento, setFechavencimiento] = useState<string>("");
  const [claseTarea, settipotarea] = useState<string>('');
  const [hora, sethora] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [percentages, setPercentages] = useState<TaskPercentage>({
    pendingPercentage: "0%",
    inProgressPercentage: "0%",
    completedPercentage: "0%",
    delayedPercentage: "0%",
  });

  const addProyecto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskCreate: TaskCreate = {
      title: accion,
      description: descripcion,
      startDate: fechainicio,
      endDate: fechavencimiento,
      taskType: claseTarea,
      notificationTime: hora,
    }
    try {
      const newTask = await createTask(taskCreate)
      toast.success('Tarea creada!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const newTaskFormatted = mapTaskToResponseToTask(newTask)
      setProjects([...projects, newTaskFormatted]);
    } catch {
      toast.error('Error al momento de crear la tarea!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const isTaskDelayed = (task: Task): boolean => {
    const now = moment(); // Obtener la fecha actual
    return (task.status !== TaskStatus.Completed && task.status !== TaskStatus.Archived) && moment(task.fechavencimiento).isBefore(now);
  };

  const countTasks = (tasks: Task[]) => {
    // Contadores de tareas
    let countPending = 0;
    let countInProgress = 0;
    let countCompleted = 0;
    let countDelayed = 0;

    tasks.forEach(task => {
      switch (task.status) {
        case TaskStatus.Pending:
          countPending++;
          break;
        case TaskStatus.InProgress:
          countInProgress++;
          break;
        case TaskStatus.Completed:
          countCompleted++;
          break;
      }

      if (isTaskDelayed(task)) {
        countDelayed++;
      }
    });

    // Calculamos el total de tareas excluyendo las retrasadas
    const totalExcludingDelayed = countPending + countInProgress + countCompleted;

    if (totalExcludingDelayed > 0) {
      setPercentages({
        pendingPercentage: `${((countPending / totalExcludingDelayed) * 100).toFixed(2)}%`,
        inProgressPercentage: `${((countInProgress / totalExcludingDelayed) * 100).toFixed(2)}%`,
        completedPercentage: `${((countCompleted / totalExcludingDelayed) * 100).toFixed(2)}%`,
        delayedPercentage: `${((countDelayed / totalExcludingDelayed) * 100).toFixed(2)}%`, // Opcional
      });
    } else {
      setPercentages({
        pendingPercentage: "0%",
        inProgressPercentage: "0%",
        completedPercentage: "0%",
        delayedPercentage: "0%",
      });
    }
  };

  const fetchDataTasks = async () => {
    try {
      const response = await getTasks();
      const tasks = mapApiResponseToTask(response)
      setProjects(tasks);
      countTasks(tasks);
      dispatch(setId(response._id));
    }
    finally {
      setLoading(false);
    }
  };

  // const updateTaskById = (_id: string, updatedTaskData: Partial<Task>) => {
  //   setProjects(prevProjects => 
  //     prevProjects.map(project => 
  //       project._id === _id ? { ...project, ...updatedTaskData } : project
  //     )
  //   );
  // };

  useEffect(() => {
    fetchDataTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col 2xl:flex-row h-[100vh] bg-white">
        {/* Sección del tablero de tareas */}
        {projects &&
          <div className="w-full 2xl:w-2/3 p-4">
            <div className="flex flex-col justify-center items-stretch mt-10 m-10">
              <h1 className="text-3xl font-bold border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 text-center">
                Tareas
              </h1>
              <div className="overflow-auto bg-white shadow-2xl flex flex-col items-center rounded-[20px] mx-auto m-2 p-4 bg-clip-border shadow-3xl dark:!bg-navy-800 dark:text-white dark:!shadow-none w-full">
                <div className="dashboard-tab">
                  {(!loading && projects.length > 0) &&
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="text-center">
                        <h2 className="text-2xl text-blue-800 mb-2">Pendiente</h2>
                        <div className="grid grid-cols-1 gap-4 p-2 m-2">
                          {projects.filter(pro => pro.status === TaskStatus.Pending).map(pro => (
                            <div
                              key={pro._id}
                              className={`task-card-border ${isTaskDelayed(pro) ? 'border-red-500' : 'border-blue-500'} border-4 p-4 rounded-[20px] min-w-[250px] max-w-[400px]`}
                            >
                              <h1 className={`${isTaskDelayed(pro) ? 'text-red-500' : ''}`}>
                                <strong>Recordar: </strong>{pro.accion}
                              </h1>
                              <p><strong>Inicio: </strong>{moment(pro.fechainicio).format('MM-DD-YYYY')}</p>
                              <p className={`${isTaskDelayed(pro) ? 'text-red-500' : ''}`}>
                                <strong>Vencimiento: </strong>{moment(pro.fechavencimiento).format('MM-DD-YYYY')}
                              </p>
                              <p><strong>Hora de Notificación: </strong>{moment(pro.hora, 'HH:mm').format('HH:mm')}</p>
                              <p><strong>Tipo: </strong>{pro.claseTarea}</p>
                              <p><strong>Más Información: </strong>{pro.descripcion}</p>
                              <div className="flex gap-x-2 justify-center items-end">
                                <BtnTareaEditar projectId={pro._id} setProjects={setProjects} projects={projects} />
                                <BtnTareaProgress projectId={pro._id} Update={fetchDataTasks} />
                                <BtnTareaEliminada projectId={pro._id} Update={fetchDataTasks} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-center">
                        <h2 className="text-2xl text-blue-800 mb-2">En Curso</h2>
                        <div className="grid grid-cols-1 gap-4 p-2 m-2">
                          {projects.filter(pro => pro.status === TaskStatus.InProgress).map(pro => (
                            <div
                              key={pro._id}
                              className={`task-card-border ${isTaskDelayed(pro) ? 'border-red-500' : 'border-blue-500'} border-4 p-4 rounded-[20px] min-w-[250px] max-w-[400px] mx-auto`}
                            >
                              <h1 className={`${isTaskDelayed(pro) ? 'text-red-500' : ''}`}>
                                <strong>Recordar: </strong>{pro.accion}
                              </h1>
                              <p><strong>Inicio: </strong>{moment(pro.fechainicio).format('MM-DD-YYYY')}</p>
                              <p className={`${isTaskDelayed(pro) ? 'text-red-500' : ''}`}>
                                <strong>Vencimiento: </strong>{moment(pro.fechavencimiento).format('MM-DD-YYYY')}
                              </p>
                              <p><strong>Hora de Notificación: </strong>{moment(pro.hora, 'HH:mm').format('HH:mm')}</p>
                              <p><strong>Tipo: </strong>{pro.claseTarea}</p>
                              <p><strong>Más Información: </strong>{pro.descripcion}</p>
                              <div className="flex gap-x-2 justify-center">
                                <BtnTareaCompleta projectId={pro._id} Update={fetchDataTasks} />
                                <BtnTareaEliminada projectId={pro._id} Update={fetchDataTasks} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-center">
                        <h2 className="text-2xl text-blue-800 mb-2">Finalizada</h2>
                        <div className="grid grid-cols-1 gap-4 p-2 m-2">
                          {projects.filter(pro => pro.status === TaskStatus.Completed).map(pro => (
                            <div
                              key={pro._id}
                              className="task-card-border text-gray-700 border-blue-500 border-4 p-4 rounded-[20px] min-w-[250px] max-w-[400px] mx-auto"
                            >
                              <h1><strong>Recordar: </strong>{pro.accion}</h1>
                              <p><strong>Inicio: </strong>{moment(pro.fechainicio).format('MM-DD-YYYY')}</p>
                              <p><strong>Vencimiento: </strong>{moment(pro.fechavencimiento).format('MM-DD-YYYY')}</p>
                              <p><strong>Hora de Notificación: </strong>{moment(pro.hora, 'HH:mm').format('HH:mm')}</p>
                              <p><strong>Tipo: </strong>{pro.claseTarea}</p>
                              <p><strong>Más Información: </strong>{pro.descripcion}</p>
                              <div className="flex gap-x-2 justify-center">
                                <BtnTareaEliminada projectId={pro._id} Update={fetchDataTasks} />
                                <BtnTareaPendiente projectId={pro._id} Update={fetchDataTasks} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>}
                  {(!loading && projects.length === 0) && <div className="grid  gap-4 justify-center items-center w-full font-semibold text-2xl h-24 text-blue-400">
                    No se ha encontrado tareas.
                  </div>}
                </div>
              </div>

              {/* Contador de tareas */}
              <div className="container mx-auto my-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-blue-700">Pendientes</h3>
                    <p className="text-2xl">{percentages.pendingPercentage}</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-yellow-700">En Curso</h3>
                    <p className="text-2xl">{percentages.inProgressPercentage}</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-green-700">Finalizadas</h3>
                    <p className="text-2xl">{percentages.completedPercentage}</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-bold text-red-700">Atrasadas</h3>
                    <p className="text-2xl">{percentages.delayedPercentage}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>}
        {/* Sección de carga de datos */}
        <div className="w-full 2xl:w-1/3 p-3">
          <div className="flex flex-col justify-center items-center mt-10">
            <form onSubmit={addProyecto} className="border-0 border-blue-900 shadow-2xl flex flex-col items-center rounded-[20px] p-4 bg-white bg-clip-border shadow-3xl dark:!bg-navy-800 dark:text-white dark:!shadow-none w-full">
              <div className="mt-6 mb-3 flex flex-wrap gap-10 md:!gap-5">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-1xl sm:text-1xl md:text-1xl xl:text-2xl 2xl:text-2xl font-normal text-blue-900">Carga el Tablero</p>
                </div>
              </div>
              <div className='flex flex-col w-full'>
                <div>
                  <label className="text-1xl text-blue-900" htmlFor="accion">Descripcion</label>
                  <input id="accion" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='Descripcion'
                    onChange={(e) => setAccion(e.target.value)} value={accion} />
                </div>
                {/* <div>
                  <label className="text-1xl text-blue-900" htmlFor="status">Estado </label>
                  <input id="status" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='Estado'
                    onChange={(e) => setStatus(e.target.value)} value={status} />
                </div> */}
                <div>
                  <label className="text-1xl text-blue-900" htmlFor="fechainicio">Fecha Inicio</label>
                  <input id="fechainicio" type="date" className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    onChange={(e) => setinicio(e.target.value)} value={fechainicio} />
                </div>
                <div>
                  <label className="text-1xl text-blue-900" htmlFor="fechavencimiento">Fecha Fin </label>
                  <input id="fechavencimiento" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    onChange={(e) => setFechavencimiento(e.target.value)} value={fechavencimiento} />
                </div>
                <label className="text-1xl text-blue-900" htmlFor="claseTarea">Tipo</label>
                <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500" name="tipo-tarea"
                  onChange={(e) => settipotarea(e.target.value)} value={claseTarea}>
                  <option value="HOGAR">Hogar</option>
                  <option value="ADMINISTRATIVA">Administrativo</option>
                  <option value="ACADEMICA">Academico</option>
                  <option value="LABORAL">Laboral</option>
                  <option value="PERSONAL">Personal</option>
                </select>
                <div>
                  <label className="text-1xl text-blue-900" htmlFor="hora">Hora de Notificacion</label>
                  <input id="hora" type="time" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    onChange={(e) => sethora(e.target.value)} value={hora} />
                </div>
                <div>
                  <label className="text-1xl text-blue-900" htmlFor="descripcionAdicional">Descripción Adicional</label>
                  <textarea id="descripcionAdicional" className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    onChange={(e) => setDescripcion(e.target.value)} value={descripcion}></textarea>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-6 mt-8 w-full'>
                <div className="flex justify-end mt-6 w-full">
                  <button className="w-full px-8 py-3 leading-5 text-white text-2xl transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600">Agregar Tarea</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default TareaNew;
