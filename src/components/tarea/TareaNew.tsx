import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import moment from 'moment';
import BtnTareaProgress from './BtnTareaProgress';
import BtnTareaCompleta from './BtnTareaCompleta';
import BtnTareaEliminada from './BtnTareaEliminada';

interface Task {
  _id: string;
  accion: string;
  fechainicio: string;
  fechavencimiento: string;
  status: string;
  claseTarea: string;
  hora: string;
  descripcion: string;
}

const TareaNew: React.FC = () => {
  const [projects, setProjects] = useState<Task[]>([
    {
      _id: '1',
      accion: 'Estudiar para la capacitacion de ISTQB',
      fechainicio: '2024-03-01',
      fechavencimiento: '2024-10-20',
      status: 'uno',
      claseTarea: 'Academico',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana'
    },
    {
      _id: '2',
      accion: 'Seguir la lectura de Kaizen',
      fechainicio: '2024-03-01',
      fechavencimiento: '2024-10-20',
      status: 'uno',
      claseTarea: 'Academico',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana'
    }, {
      _id: '3',
      accion: 'Preparar la Pretesis 4 ',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-09',
      status: 'dos',
      claseTarea: 'Hogar',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana'
    },{
      _id: '4',
      accion: 'Vender la Tv Smart 43',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-07',
      status: 'tres',
      claseTarea: 'Hogar',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana'
    }, {
      _id: '5',
      accion: 'Gestion de Pagos del Mes ',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-15',
      status: 'dos',
      claseTarea: 'Hogar',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana'
    },{
      _id: '6',
      accion: 'Ver Furiosa en el cine ',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-02',
      status: 'dos',
      claseTarea: 'Hogar',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana'
    },
    {
      _id: '7',
      accion: 'Reunión con el equipo',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-02',
      status: 'tres',
      claseTarea: 'Laboral',
      hora: '14:00',
      descripcion: 'Reunión semanal de seguimiento'
    },
    {
      _id: '8',
      accion: 'Enviar informe',
      fechainicio: '2024-07-01',
      fechavencimiento: '2024-07-02',
      status: 'tres',
      claseTarea: 'Laboral',
      hora: '16:00',
      descripcion: 'Enviar informe mensual al jefe'
    },
    {
      _id: '9',
      accion: 'Comprar pipeta para perro',
      fechainicio: '2024-06-29',
      fechavencimiento: '2024-06-30',
      status: 'tres',
      claseTarea: 'Hogar',
      hora: '18:00',
      descripcion: 'Compra de la pipeta de perro grande y compra de purina de la marca prontodog de 25 kl'
    },
    {
      _id: '10',
      accion: 'Ingles CPK Elementary 1 ',
      fechainicio: '2024-03-01',
      fechavencimiento: '2024-10-20',
      status: 'dos',
      claseTarea: 'Academico',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana'
    },
    {
      _id: '11',
      accion: 'Ingles CPK Elementary 2 ',
      fechainicio: '2024-03-01',
      fechavencimiento: '2024-10-20',
      status: 'uno',
      claseTarea: 'Academico',
      hora: '10:00',
      descripcion: 'Comprar comida para la semana'
    },
  ]);

  const [accion, setAccion] = useState<string>('');
  const [status, setStatus] = useState<string>('uno');
  const [fechainicio, setinicio] = useState<string>('');
  const [fechavencimiento, setFechavencimiento] = useState<string>('');
  const [claseTarea, settipotarea] = useState<string>('');
  const [hora, sethora] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');

  const addProyecto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nuevaTarea: Task = {
      _id: Math.random().toString(36).substr(2, 9), // Generar un ID aleatorio
      accion,
      fechainicio,
      fechavencimiento,
      status,
      claseTarea,
      hora,
      descripcion
    };
    setProjects([...projects, nuevaTarea]);
  };

  const contarTareas = (status: string) => {
    const now = moment();
    return projects.filter(project => {
      if (status === 'atrasadas') {
        return moment(project.fechavencimiento).isBefore(now) && project.status !== 'uno';
      }
      return project.status === status;
    }).length;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row h-[100vh] bg-white">
        {/* Sección del tablero de tareas */}
        <div className="w-full lg:w-2/3 p-4">
          <div className="flex flex-col justify-center items-stretch mt-10 m-10">
            <h1 className="text-3xl font-bold border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">Tareas</h1>
            <div className='overflow-auto bg-white shadow-2xl flex flex-col items-center rounded-[20px] mx-auto m-2 p-4 bg-white bg-clip-border shadow-3xl dark:!bg-navy-800 dark:text-white dark:!shadow-none'>
              <div className='dashboard-tab'>
                <table className='table-fixed w-full text-center'>
                  <thead className='border-b-4 border-blue-900'>
                    <tr>
                      <th scope="col" className='text-2xl text-blue-800'>Pendiente</th>
                      <th scope="col" className='text-2xl text-blue-800'>En Curso</th>
                      <th scope="col" className='text-2xl text-blue-800'>Finalizada</th>
                    </tr>
                  </thead>
                  <tbody className='align-top'>
                    <tr>
                      <td className='td-css'>
                        <div className='text-gray-700 grid grid-cols-1 gap-4 p-2 m-2'>
                          {projects.filter(pro => pro.status === 'uno').map(pro =>
                            <div key={pro._id} className='task-card-border border-blue-500 border-4 p-2 m-2 rounded-[20px]'>
                              <h1><strong>Recordar: </strong>{pro.accion}</h1>
                              <h5><strong>Inicio: </strong>  {moment(pro.fechainicio).format('MM-DD-YYYY')}</h5>
                              <h5><strong>Vencimiento: </strong>  {moment(pro.fechavencimiento).format('MM-DD-YYYY')}</h5>
                              <h5><strong>Hora de Notificación: </strong> {moment(pro.hora, 'HH:mm').format('HH:mm')}</h5>
                              <h5><strong>Tipo: </strong> {pro.claseTarea}</h5>
                              <h6><strong>Más Información: </strong> {pro.descripcion}</h6>
                              <BtnTareaProgress projectId={pro._id} Update={() => { }} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className='td-css'>
                        <div className='grid grid-cols-1 gap-4 p-2 m-2'>
                          {projects.filter(pro => pro.status === 'dos').map(pro =>
                            <div key={pro._id} className='task-card-border text-gray-700 border-blue-500 border-4 p-2 m-2 rounded-[20px]'>
                              <h1><strong>Recordar: </strong>{pro.accion}</h1>
                              <h5><strong>Inicio: </strong>  {moment(pro.fechainicio).format('MM-DD-YYYY')}</h5>
                              <h5><strong>Vencimiento: </strong>  {moment(pro.fechavencimiento).format('MM-DD-YYYY')}</h5>
                              <h5><strong>Hora de Notificación: </strong> {moment(pro.hora, 'HH:mm').format('HH:mm')}</h5>
                              <h5><strong>Tipo: </strong> {pro.claseTarea}</h5>
                              <h6><strong>Más Información: </strong> {pro.descripcion}</h6>
                              <BtnTareaCompleta projectId={pro._id} Update={() => { }} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className='td-css'>
                        <div className='grid grid-cols-1 gap-4 p-2 m-2'>
                          {projects.filter(pro => pro.status === 'tres').map(pro =>
                            <div key={pro._id} className='task-card-border text-gray-700 border-blue-500 border-4 p-2 m-2 rounded-[20px]'>
                              <h1><strong>Recordar: </strong>{pro.accion}</h1>
                              <h5><strong>Inicio: </strong>  {moment(pro.fechainicio).format('MM-DD-YYYY')}</h5>
                              <h5><strong>Vencimiento: </strong>  {moment(pro.fechavencimiento).format('MM-DD-YYYY')}</h5>
                              <h5><strong>Hora de Notificación: </strong> {moment(pro.hora, 'HH:mm').format('HH:mm')}</h5>
                              <h5><strong>Tipo: </strong> {pro.claseTarea}</h5>
                              <h6><strong>Más Información: </strong> {pro.descripcion}</h6>
                              <BtnTareaEliminada projectId={pro._id} Update={() => { }} />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className='tfoot-btn'></tfoot>
                </table>
              </div>
            </div>
            {/* Contador de tareas */}
            <div className="container mx-auto my-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-100 p-2 md:p-4 rounded-lg shadow-md text-center">
                  <h3 className="text-lg md:text-xl font-bold text-blue-700">Pendientes</h3>
                  <p className="text-lg md:text-2xl">{contarTareas('uno')}</p>
                </div>
                <div className="bg-yellow-100 p-2 md:p-4 rounded-lg shadow-md text-center">
                  <h3 className="text-lg md:text-xl font-bold text-yellow-700">En Curso</h3>
                  <p className="text-lg md:text-2xl">{contarTareas('dos')}</p>
                </div>
                <div className="bg-green-100 p-2 md:p-2 rounded-lg shadow-md text-center">
                  <h3 className="text-lg md:text-xl font-bold text-green-700">Finalizadas</h3>
                  <p className="text-lg md:text-2xl">{contarTareas('tres')}</p>
                </div>
                <div className="bg-red-100 p-2 md:p-2 rounded-lg shadow-md text-center">
                  <h3 className="text-lg md:text-xl font-bold text-red-700">Atrasadas</h3>
                  <p className="text-lg md:text-2xl">{contarTareas('atrasadas')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* Sección de carga de datos */}
        <div className="w-full lg:w-1/3 p-3">
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
                <div>
                  <label className="text-1xl text-blue-900" htmlFor="status">Estado </label>
                  <input id="status" type="text" className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='Estado'
                    onChange={(e) => setStatus(e.target.value)} value={status} />
                </div>
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
                <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500" name="tipo-tarea" placeholder='Seleccione un tipo'
                  onChange={(e) => settipotarea(e.target.value)} value={claseTarea}>
                  <option value="Hogar">Hogar</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Academico">Academico</option>
                  <option value="Laboral">Laboral</option>
                  <option value="Personal">Personal</option>
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
