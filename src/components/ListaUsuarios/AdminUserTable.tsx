import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaRedoAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarAdmin from '@components/NavbarAdmin/NavbarAdmin';
import { getManaggeUser } from './services/getManaggeUser.services';
import { UserAdminList } from './models/userAdminList';
import { useDispatch, useSelector } from 'react-redux';
import { setId } from 'src/redux/states/user.state';
import { getTasks } from '@components/tarea/services/getTasks.services';
import { DialogAdmingChangePassword } from './components/DialogAdminChangePassword';
import { RootState } from 'src/redux/store';
import { deleteUser } from './services/deleteUser.services';
import { DialogDeleteUser } from './components/DialogDeleteUser';

const AdminUserTable: React.FC = () => {

  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.userAuth.id);

  const [users, setUsers] = useState<UserAdminList[]>([]);
  const [openPass, setOpenPass] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [findId, setFindId] = useState<string>('');
  const [findName, setFindName] = useState<string>('');

  const fetchData = async () => {
    let response = await getManaggeUser();
    if(findName) response = response.filter((item) => (item.username + " " + item.lastname).toLowerCase().includes(findName.toLowerCase()))
    if(findId) response = response.filter((item) => item._id.includes(findId) )
    setUsers(response)
  }

  const initializateData = async () => {
    const response = await getTasks();
    dispatch(setId(response._id));
  }

  useEffect(() => {
    fetchData();
    initializateData();
  }, []);

  const parsetRole = (role: string) => role === "admin" ? 'Administrador' : 'Usuario';

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return ""; // Verifica si es undefined o null
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (isNaN(parsedDate.getTime())) {
        console.error("Fecha inválida:", date);
        return "";
    }

    return `${String(parsedDate.getDate()).padStart(2, '0')}/${String(parsedDate.getMonth() + 1).padStart(2, '0')}/${parsedDate.getFullYear()}`;
};

  const onClosePass = () => {
    setOpenPass(false);
  };

  const onOpenPass = () => {
    setOpenPass(true);
  };

  const onCloseDelete = () => {
    setOpenDelete(false);
  };

  const onOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id ?? "")
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      toast.success('Se ha eliminado exitosamente el usuario!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onCloseDelete();
    }
    catch {
      toast.success('Ha ocurrido un error al usuario!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onCloseDelete();
    }
  }

  return (
    <div>
      <DialogAdmingChangePassword open={openPass} onClose={onClosePass} />
      <DialogDeleteUser open={openDelete} onClose={onCloseDelete} deleteUser={handleDeleteUser} />
      <NavbarAdmin />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">GESTION</h1>
        <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="NOMBRE"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setFindName(e.target.value)}
          />
          <input
            type="text"
            placeholder="ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setFindId(e.target.value)}
          />
          <button onClick={fetchData} className="px-4 py-2 bg-blue-500 text-white rounded-md">BUSCAR</button>
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
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{`${user.username ?? ""} ${user.lastname ?? ""} `}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{parsetRole(user.role)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.additionalInfo?.phoneNumber ?? ""}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded-md"
                        onClick={onOpenDelete}
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        className="px-2 py-1 text-sm bg-yellow-500 text-white rounded-md"
                        onClick={onOpenPass}
                      >
                        <FaRedoAlt />
                      </button>
                    </div>
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