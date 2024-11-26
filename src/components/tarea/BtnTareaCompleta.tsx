
// import React from 'react';
// import axios from 'axios';

// const BtnTareaCompleta = ({ projectId, Update }) => {
//     const statusUpdate = (e) => {
//         e.preventDefault();
//         axios.put(`http://localhost:8000/api/edit/tarea/${projectId}`, {
//             status: 'tres' // Cambiar el estado a "tres"
//         }).then((res) => {
//             Update(); // Llamar a la función Update para refrescar las tareas
//         }).catch((err) => {
//             console.log(err);
//         });
//     };

//     return (
//         <div>
//             <br />
//             <button className='btn-progress bg-yellow-400 border-yellow-900  rounded-[10px] px-2 py-1  text-white' onClick={statusUpdate}>
//                 Finalizar 
//             </button>
//         </div>
//     );
// };

// export default BtnTareaCompleta;

import React from 'react';
import { postUpdateTask } from './services/updateTask.services';
import { toast } from 'react-toastify';
import { TaskStatus } from 'src/models/tasksStatus.model';

interface BtnTareaCompletaProps {
  projectId: string;
  Update: () => void;
}

const BtnTareaCompleta: React.FC<BtnTareaCompletaProps> = ({ projectId, Update }) => {
  const statusUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postUpdateTask(projectId, TaskStatus.Completed);
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
      <button className='btn-progress bg-yellow-400 border-yellow-900 rounded-[10px] px-2 py-2 text-white h-7 flex items-center' onClick={statusUpdate}>
        Finalizar
      </button>
    </div>
  );
};

export default BtnTareaCompleta;
