import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import { useState } from "react";
import { TaskCreate } from "./models/taskCreate";
import { updateTaskV2 } from "./services/updateTaskV2.services";
import { toast } from "react-toastify";
import { mapTaskToResponseToTask } from "./models/mappersTask";
import { TaskStatus } from "src/models/tasksStatus.model";
import { Task } from "./models/task";


interface DialogEditTaskProps {
    open: boolean;
    onClose: () => void; // Función para cerrar el diálogo
    id: string;
    setProjects: React.Dispatch<React.SetStateAction<Task[]>>;
    // projects: Task[];
    task: Task | undefined
}

export const DialogEditTask = ({ open, onClose, id, setProjects, task }: DialogEditTaskProps) => {
    const [accion, setAccion] = useState<string>(task?.accion ?? "");
    const [fechainicio, setinicio] = useState<string>(
        task?.fechainicio ? new Date(task.fechainicio).toISOString().split("T")[0] : ""
    );
    const [fechavencimiento, setFechavencimiento] = useState<string>(
        task?.fechavencimiento ? new Date(task.fechavencimiento).toISOString().split("T")[0] : ""
    );
    const [claseTarea, settipotarea] = useState<string>(task?.claseTarea ?? "");
    const [hora, sethora] = useState<string>(task?.hora ?? "");
    const [descripcion, setDescripcion] = useState<string>(task?.descripcion ?? "");
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.Pending);

    const editProyecto = async (e: React.FormEvent<HTMLFormElement>) => {
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
            const newTask = await updateTaskV2(taskCreate, status, id)
            toast.success('Tarea actualizada!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const newTaskFormatted = mapTaskToResponseToTask(newTask)
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project._id === id ? newTaskFormatted : project // Reemplaza el proyecto con el mismo ID
                )
            );
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

    return (
        <>
            {task &&
                <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>Editar Tarea</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={editProyecto} className="border-0 border-blue-900 shadow-2xl flex flex-col items-center rounded-[20px] p-4 bg-white bg-clip-border shadow-3xl dark:!bg-navy-800 dark:text-white dark:!shadow-none w-full">
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
                                    <label className="text-1xl text-blue-900" htmlFor="fechainicio">Fecha Inicio</label>
                                    <input id="fechainicio" type="date" className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={(e) => setinicio(e.target.value)} value={fechainicio} />
                                </div>
                                <div>
                                    <label className="text-1xl text-blue-900" htmlFor="fechavencimiento">Fecha Fin </label>
                                    <input id="fechavencimiento" type="date" className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={(e) => setFechavencimiento(e.target.value)} value={fechavencimiento} />
                                </div>
                                <label className="text-1xl text-blue-900" htmlFor="claseTarea">Tipo</label>
                                <select
                                    className="block w-full px-4 py-2 mt-2 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    name="tipo-tarea"
                                    onChange={(e) => setStatus(e.target.value as TaskStatus)} value={status}>
                                    <option value="">Todos</option>
                                    <option value={TaskStatus.Pending}>Pendiente</option>
                                    <option value={TaskStatus.InProgress}>En Curso</option>
                                    <option value={TaskStatus.Completed}>Finalizado</option>
                                    <option value={TaskStatus.Archived}>Eliminado</option>
                                </select>
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
                                    <button className="w-full px-8 py-3 leading-5 text-white text-2xl transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600">ActualizarTarea</button>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            }
        </>
    );
};
