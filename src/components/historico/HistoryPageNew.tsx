import React from 'react';
import Navbar from '../Navbar/Navbar';
// import HistoryTable from './HistoryTable';
import HistoryTableNew from './HistoryTableNew';
import HistoryTable from './HistoryTable';

const HistoryPage: React.FC = () => {

  const handleSearch = () => {
    // Lógica de búsqueda aquí
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5">
        <h1 className="text-3xl font-bold mb-6 border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">
          Historial de Tareas
        </h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Tipo"
          // value={tipo}
          // onChange={(e) => setTipo(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Estado"
          // value={estado}
          // onChange={(e) => setEstado(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          BUSCAR
        </button>
      </div>
        <HistoryTableNew />
      </div>
    </>
  );
};

export default HistoryPage;
