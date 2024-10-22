import React from 'react';
import { postUpdateTask } from './services/updateTask.services';
import { TaskStatus } from 'src/models/tasksStatus.model';
import { toast } from 'react-toastify';

interface BtnTareaProgressProps {
  projectId: string;
  Update: () => void;
}

const BtnTareaProgress: React.FC<BtnTareaProgressProps> = ({ projectId, Update }) => {
  const statusUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postUpdateTask(projectId, TaskStatus.InProgress);
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
      <button className='btn-progress bg-green-400 border-green-900 rounded-[10px] px-2 py-1 text-white' onClick={statusUpdate}>
        Iniciar
      </button>
    </div>
  );
};

export default BtnTareaProgress;


// import React from 'react';
// import axios from 'axios';

// const BtnTareaProgress = ({ projectId, Update }) => {
//     const statusUpdate = (e) => {
//         e.preventDefault();
//         axios.put(`http://localhost:8000/api/edit/tarea/${projectId}`, {
//             status: 'dos' // Cambiar el estado a "dos"
//         }).then((res) => {
//             Update(); // Llamar a la función Update para refrescar las tareas
//         }).catch((err) => {
//             console.log(err);
//         });
//     };

//     return (
//         <div>
//              <br />
//             <button className='btn-progress bg-green-400 border-green-900 rounded-[10px] px-2 py-1  text-white' onClick={statusUpdate}>
//                 Iniciar
//             </button>
//         </div>
//     );
// };

// export default BtnTareaProgress;