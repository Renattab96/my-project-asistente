import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Button } from "@components/ui/Button";
import userIcon from "../../assets/img/user-icon.png";

const CuentaNew: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

  const user = {
    _id: "1",
    username: "Juan",
    lastname: "Pérez",
    email: "juan.perez@example.com",
    telefono: "123456789",
    cargo: "Desarrollador",
    profilePicture: "",
    notificationsEnabled: true,
  };

  const additionalDetails = {
    cargo: "Desarrollador Senior",
    ingreso: "01/01/2020",
    email: "juan.perez@example.com",
    telefono: "123456789",
    notificacion: "Habilitado",
  };

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
        <div className="flex flex-col md:flex-row -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <div className="flex flex-col items-center justify-center mx-5 lg:mx-10">
              <h2 className="text-2xl font-semibold mb-4">Hola, {user.username}</h2>
              <div className="bg-white shadow-md rounded-lg p-6 w-full">
                <div className="flex items-center justify-center mb-6">
                  <img
                    className="h-full w-full rounded-full"
                    src={selectedImage ? selectedImage.toString() : user.profilePicture || userIcon}
                    alt="Avatar"
                  />
                </div>
                <div className="mb-4 text-left">
                  <h3 className="text-xl font-bold">Datos Personales</h3>
                  <p>
                    <strong>Nombre:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {user.lastname}
                  </p>
                  <p>
                    <strong>Nro. Teléfono:</strong> {user.telefono}
                  </p>
                  <p>
                    <strong>Correo Electrónico:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Cargo:</strong> {user.cargo}
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
                  onClick={() => document.getElementById("upload-image")!.click()}
                >
                  Editar Foto
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
              <h3 className="text-xl font-bold mb-4">Datos Adicionales</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Cargo</label>
                <input
                  className="w-full border-2 rounded p-2"
                  type="text"
                  value={additionalDetails.cargo}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ingreso</label>
                <input
                  className="w-full border-2 rounded p-2"
                  type="text"
                  value={additionalDetails.ingreso}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  className="w-full border-2 rounded p-2"
                  type="email"
                  value={additionalDetails.email}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nro de Teléfono</label>
                <input
                  className="w-full border-2 rounded p-2"
                  type="text"
                  value={additionalDetails.telefono}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Notificación</label>
                <input
                  className="w-full border-2 rounded p-2"
                  type="text"
                  value={additionalDetails.notificacion}
                  readOnly
                />
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

export default CuentaNew;
