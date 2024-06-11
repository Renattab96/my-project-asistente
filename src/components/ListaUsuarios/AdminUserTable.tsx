import React, { useState } from 'react';
import { FaTrashAlt, FaRedoAlt } from 'react-icons/fa';
import { RiAccountBoxLine } from "react-icons/ri";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarAdmin from '@components/NavbarAdmin/NavbarAdmin';

interface User {
  id: string;
  name: string;
  userId: string;
  accountType: string;
  email: string;
  phone: string;
  creationDate: string;
  status: 'Active' | 'Inactive';
}

const AdminUserTable: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Compra de Supermercado',
      userId: '01',
      accountType: 'Personal',
      email: 'test@test.com',
      phone: '0983442811',
      creationDate: '15/04/2024 8:00',
      status: 'Inactive',
    },
    {
      id: '2',
      name: 'Mountain_HD_1920x1080.png',
      userId: '02',
      accountType: 'Administrador',
      email: 'test@gmail.com',
      phone: '0991234234',
      creationDate: '15/04/2024 10:00',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Waterfall_HD_1920x1080.png',
      userId: '01',
      accountType: 'Personal',
      email: 'test2@hotmail.com',
      phone: '0973456734',
      creationDate: '15/04/2024 12:00',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Forest_HD_1920x1080.png',
      userId: '01',
      accountType: 'Personal',
      email: '19/06/2024',
      phone: '0987439939',
      creationDate: '15/04/2024 14:00',
      status: 'Active',
    },
    {
      id: '5',
      name: 'Glades_HD_1920x1080.png',
      userId: '01',
      accountType: 'Personal',
      email: '19/06/2024',
      phone: '0982345890',
      creationDate: '15/04/2024 11:45',
      status: 'Inactive',
    },
  ]);

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  const notify = () => {
    toast.info('Funcionalidad en desarrollo', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // const handleDelete = (userId: string) => {
  //   setUsers(users.filter(user => user.id !== userId));
  // };

  // const handleResetPassword = (userId: string) => {
  //   console.log('Resetting password for user with ID:', userId);
  //   // Lógica para restablecer la contraseña
  // };

  return (
    <div>
        <NavbarAdmin/>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">GESTION</h1>
        <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="NOMBRE"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="CODIGO"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          />
          <button   onClick={notify} className="px-4 py-2 bg-blue-500 text-white rounded-md">BUSCAR</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre y Apellido</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User-id</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuenta</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email registrado</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefono registrado</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de la creacion</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.accountType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.creationDate}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                    {user.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.status === 'Active' && (
                      <div className="flex space-x-2">
                        <button
                          className="px-2 py-1 text-sm bg-red-500 text-white rounded-md"
                          // onClick={() => handleDelete(user.id)}
                          onClick={notify}
                        >
                          <FaTrashAlt />
                        </button>
                        <button
                          className="px-2 py-1 text-sm bg-yellow-500 text-white rounded-md"
                          // onClick={() => handleResetPassword(user.id)}
                          onClick={notify}
                        >
                          <FaRedoAlt />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminUserTable;




// import React from "react";
// import NavbarAdmin from "@components/NavbarAdmin/NavbarAdmin";

// const ListaUsuario = () => {
//   return (
//     <>
//       <div>
//         <NavbarAdmin />
//       </div>
//       <div>
//         <h1>esta es un pantalla provisoria </h1>
//       </div>
//     </>
//   );
// };

// export default ListaUsuario;




