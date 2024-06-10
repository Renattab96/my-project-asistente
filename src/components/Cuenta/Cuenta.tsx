import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Switch } from '@components/ui/Switch';
import {Button}  from '@components/ui/Button';
const userIcon = '../../assets/img/user-icon';

const Cuenta = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5">
        <h1 className="text-3xl font-bold mb-6 border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">Datos de la Cuenta</h1>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <div className="flex flex-col items-center justify-center mt-10 mx-5 lg:mx-20">
              <h2 className="text-2xl font-semibold mb-4">Hola. Test </h2>
              <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                  <img className="h-full w-full rounded-full" src={selectedImage ? selectedImage : userIcon} alt="Avatar" />
                </div>
                <div className="mb-4 text-left">
                  <h3 className="text-xl font-bold">Datos Personales</h3>
                  <p><strong>Nombre:</strong> Test</p>
                  <p><strong>Apellido:</strong> Test</p>
                  <p><strong>Nro. Teléfono:</strong> Test</p>
                  <p><strong>Correo Electrónico:</strong> Test</p>
                  <p><strong>Cargo:</strong> Test</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  id="upload-image" 
                  onChange={handleImageChange} 
                />
                <Button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" 
                  onClick={() => document.getElementById('upload-image').click()}
                >
                  Editar Foto
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <div className="flex flex-col items-center mt-10 mx-5 lg:mx-20">
              <section className="shadow-2xl w-full p-6 bg-white rounded-md text-gray-700">
                <div className="mb-4 text-left">
                  <h4 className="text-xl font-bold">Datos Personales</h4>
                  <p><strong>Nombre:</strong> Test</p>
                  <p><strong>Apellido:</strong> Test</p>
                  <p><strong>Nro. Teléfono:</strong> Test</p>
                  <p><strong>Correo Electrónico:</strong> Test</p>
                  <p><strong>Cargo:</strong> Test</p>
                </div>
                <div className="mb-4 text-left">
                  <h4 className="text-xl font-bold">Datos Adicionales</h4>
                </div>
                <form>
                  <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">
                    <div>
                      <label className="text-xl text-gray-700" htmlFor="cargo">Cargo</label>
                      <input id="cargo" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                      <label className="text-xl text-gray-700" htmlFor="ingreso">Ingreso</label>
                      <input id="ingreso" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                      <label className="text-xl text-gray-700" htmlFor="emailAddress">Email</label>
                      <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                      <label className="text-xl text-blue-900" htmlFor="number">Nro de Teléfono</label>
                      <input id="number" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notificación</label>
                      <div className="flex items-center mt-2">
                        <Switch />
                        <label className="ml-2 block text-sm text-gray-900">Habilitar Mensajería</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button className="px-8 py-3 leading-5 text-white text-2xl transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 focus:outline-none focus:bg-gray-600">Guardar</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cuenta;
