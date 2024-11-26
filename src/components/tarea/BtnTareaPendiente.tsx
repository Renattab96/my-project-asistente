import React from 'react';
import { postUpdateTask } from './services/updateTask.services';
import { TaskStatus } from 'src/models/tasksStatus.model';
import { toast } from 'react-toastify';

interface BtnTareaProgressProps {
    projectId: string;
    Update: () => void;
}

const BtnTareaPendiente: React.FC<BtnTareaProgressProps> = ({ projectId, Update }) => {
    const statusUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        postUpdateTask(projectId, TaskStatus.Pending);
        Update();
        toast.success('Tarea actualizada exitosamente!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div>
            <br />
            <button className='btn-progress bg-blue-400 border-blue-900 rounded-[10px] px-2 py-2 text-white h-7 flex items-center' onClick={statusUpdate}>
                Reiniciar
            </button>
        </div>
    );
};

export default BtnTareaPendiente;