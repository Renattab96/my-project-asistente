import React from 'react';
import { postUpdateTask } from './services/updateTask.services';
import { TaskStatus } from 'src/models/tasksStatus.model';
import { toast } from 'react-toastify';

interface BtnTareaEliminadaProps {
  projectId: string;
  Update: () => void;
}

const BtnTareaEliminada: React.FC<BtnTareaEliminadaProps> = ({ projectId, Update }) => {
  const statusUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postUpdateTask(projectId, TaskStatus.Archived);
    Update();
    toast.success('Tarea eliminada exitosamente!', {
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
      <button className='btn-remove bg-red-500 border-red-700 px-2 py-2 rounded-[10px] text-white h-7 flex items-center' type="submit" onClick={statusUpdate}>
        Eliminar
      </button>
    </div>
  );
};

export default BtnTareaEliminada;


// import React from 'react';
// import axios from 'axios';

// const BtnTareaEliminada = ({ projectId, Update }) => {
//     const statusUpdate = (e) => {
//         e.preventDefault();
//         axios.delete(`http://localhost:8000/api/tarea/eliminar/${projectId}`)
//             .then((res) => {
//                 Update(); // Llamar a la función Update para refrescar las tareas
//             }).catch((err) => {
//                 console.log(err);
//             });
//     };

//     return (
//         <div>
//              <br />
//             <button className='btn-remove bg-red-500 border-red-700 px-2 py-1 rounded-[10px] text-white' type="submit" onClick={statusUpdate}>
//                Eliminar
//             </button>
//         </div>
//     );
// };

// export default BtnTareaEliminada;