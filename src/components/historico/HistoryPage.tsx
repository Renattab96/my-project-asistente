
import React, { useState } from 'react';
// import React from 'react';
import Navbar from '../Navbar/Navbar';
// import Button from '../../../@/components/ui/Button';
import HistoryTable from '../historico/HistoryTable';

// import React, { useState } from 'react';
// import HistoryTable from '../components/HistoryTable';

const data = [
  {
    concepto: 'Compra de Supermercado',
    tipoTarea: 'Administrativo',
    fechaInicio: '13/04/2024',
    fechaCierre: '19/06/2024',
    horaNotificacion: '8:00',
    estado: 'Failed',
  },
  {
    concepto: 'Mountain_HD_1920×1080.png',
    tipoTarea: 'Académico',
    fechaInicio: '19/06/2024',
    fechaCierre: '19/06/2024',
    horaNotificacion: '10:00',
    estado: 'Warning',
  },
  {
    concepto: 'Waterfall_HD_1920×1080.png',
    tipoTarea: 'Personal',
    fechaInicio: '19/06/2024',
    fechaCierre: '19/06/2024',
    horaNotificacion: '12:00',
    estado: 'Processing',
  },
  {
    concepto: 'Forest_HD_1920×1080.png',
    tipoTarea: 'Hogar',
    fechaInicio: '19/06/2024',
    fechaCierre: '19/06/2024',
    horaNotificacion: '14:00',
    estado: 'Verified',
  },
  {
    concepto: 'Glades_HD_1920×1080.png',
    tipoTarea: 'Académico',
    fechaInicio: '19/06/2024',
    fechaCierre: '19/06/2024',
    horaNotificacion: '11:45',
    estado: 'Processing',
  },
];

const HistoryPage: React.FC = () => {
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState('');

  const handleSearch = () => {
    // Lógica de búsqueda aquí
  };

  return (
    <div className="p-4">
      <Navbar/>
      <h1 className="text-3xl font-bold mb-4">Historico</h1>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          BUSCAR
        </button>
      </div>
      <div className="overflow-x-auto">
        <HistoryTable data={data} />
      </div>
    </div>
  );
};

export default HistoryPage;
