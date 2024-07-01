import React, { useState } from 'react';
import { Link } from "react-router-dom";
import imgRegister from '../../assets/img/img-register.jpg';

const Register2 = () => {
  // const [formData, setFormData] = useState({
  //   nombre: '',
  //   apellido: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: ''
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Handle form submission
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto">
        <div className="hidden md:block md:w-1/2">
        <img
          src={imgRegister}
          className="w-full h-full object-cover"
          alt="nanduti-login"
        />
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Crea una cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-gray-700">Nombre/s</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apellido" className="block text-gray-700">Apellido/s</label>
              <input
                type="text"
                name="apellido"
                id="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Repite contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
            >
              Crear cuenta
            </button>
          </form>

          
        </div>

      </div>
    </div>
  );
};

export default Register2;
