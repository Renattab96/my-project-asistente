import React, { useState } from 'react'
import { Link } from "react-router-dom";
import imgRegister from "../../assets/img/img-register.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from 'src/services/register.services';

const Register = () => {

  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        lastname,
        email,
        password,
        confirmpassword
      }
      await register(userData);
      toast.success('Registro exitoso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/');

    } catch (error) {
      console.error('Error al registrar:', error);
      toast.error('Error al registrar. Por favor, verifica tus datos.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
          <img
            src={imgRegister}
            className="w-full h-full object-cover"
            alt="nanduti-login"
          />
        </div>
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 shadow-lg rounded-lg flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6">Crea una cuenta</h2>
            <form
              onSubmit={handleRegister}
            >
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 text-lg">
                  Nombre/s
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="apellido"
                  className="block text-gray-700 text-lg"
                >
                  Apellido/s
                </label>
                <input
                  type="text"
                  name="apellido"
                  id="apellido"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-lg"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-lg"
                >
                  Repite contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300 text-lg"
              >
                Crear cuenta
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/">
                <p className="text-lg font-normal text-blue-900 mb-8 underline">
                  Inicia Sesión
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
