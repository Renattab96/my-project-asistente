import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import { Switch } from "@components/ui/Switch";
import { Button } from "@components/ui/Button";
import userIcon from "../../assets/img/user-icon.png";
import axios from "axios";


interface User {
  _id: string;
  username: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
  profilePicture?: string;
  notificationsEnabled: boolean;
  role: string;
  loginAttempts: number;
  lockUntil: number;
  deviceToken?: string;
  cargo?: string;
  telefono?: string;
  sueldo_inicial?: number;
}

const Cuenta = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [isSwitchOn, setIsSwitchOn] = useState(false);
// http://localhost:5000/api/users/        // const id ='6683404a7ba8a1a70a235d44'
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
  
    fetchUser();
  }, [id]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold mb-6 border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">
        Datos de la Cuenta
      </h1>
      <div className="flex -mx-2">
        <div className="w-1/2 px-2">
          <div className="flex flex-col items-center justify-center mx-5 lg:mx-10">
            <h2 className="text-2xl font-semibold mb-4">Hola, {user ? user.username : 'Cargando...'}</h2>
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
              <div className="flex items-center justify-center mb-6">
                <img
                  className="h-full w-full rounded-full"
                  src={selectedImage ? selectedImage.toString() : user?.profilePicture || userIcon}
                  alt="Avatar"
                />
              </div>
              <div className="mb-4 text-left">
                <h3 className="text-xl font-bold">Datos Personales</h3>
                <p>
                  <strong>Nombre:</strong> {user ? user.username : 'Cargando...'}
                </p>
                <p>
                  <strong>Apellido:</strong> {user ? user.lastname : 'Cargando...'}
                </p>
                <p>
                  <strong>Nro. Teléfono:</strong> {user ? user.telefono || 'No disponible' : 'Cargando...'}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong> {user ? user.email : 'Cargando...'}
                </p>
                <p>
                  <strong>Cargo:</strong> {user ? user.cargo || 'No disponible' : 'Cargando...'}
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="upload-image"
                onChange={handleImageChange}
              />
              <Button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() =>
                  document.getElementById("upload-image")!.click()
                }
              >
                Editar Foto
              </Button>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-2">
          <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h3 className="text-xl font-bold mb-4">Datos Adicionales</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Cargo</label>
              <input className="w-full border-2 rounded p-2" type="text" placeholder="Cargo" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Ingreso</label>
              <input className="w-full border-2 rounded p-2" type="text" placeholder="Ingreso" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input className="w-full border-2 rounded p-2" type="email" placeholder="Email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nro de Teléfono</label>
              <input className="w-full border-2 rounded p-2" type="text" placeholder="Nro de Teléfono" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Notificación</label>
              <div className="flex items-center">
              {/* <Swiitch></Swiitch>  <input type="checkbox" className="mr-2" /> */}
                {/* <span>Habilitar Mensajería</span> */}
              </div>
            </div>
            <Button className="w-full bg-orange-500 text-white rounded hover:bg-orange-700">
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default Cuenta;


