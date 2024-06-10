import React from 'react';
import axios from 'axios';

const BtnTareaEliminada = ({ projectId, Update }) => {
    const statusUpdate = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/tarea/eliminar/${projectId}`)
            .then((res) => {
                Update(); // Llamar a la función Update para refrescar las tareas
            }).catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
             <br />
            <button className='btn-remove bg-red-500 border-red-700 px-2 py-1 rounded-[10px] text-white' type="submit" onClick={statusUpdate}>
               Eliminar
            </button>
        </div>
    );
};

export default BtnTareaEliminada;