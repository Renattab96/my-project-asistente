
import React from 'react';
import axios from 'axios';

const BtnTareaCompleta = ({ projectId, Update }) => {
    const statusUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/edit/tarea/${projectId}`, {
            status: 'tres' // Cambiar el estado a "tres"
        }).then((res) => {
            Update(); // Llamar a la función Update para refrescar las tareas
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <br />
            <button className='btn-progress bg-yellow-400 border-yellow-900  rounded-[10px] px-2 py-1  text-white' onClick={statusUpdate}>
                Finalizar 
            </button>
        </div>
    );
};

export default BtnTareaCompleta;

