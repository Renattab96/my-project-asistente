import React from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const LoginAdmin = () => {
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
  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">ASISTENTE ONLINE</h1>
        <Link to="/" className="text-lg">Accede a tu Asistente Online</Link>
      </header>
      <main className="flex-grow flex items-center justify-center bg-blue-200">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-blue-900">Login</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-blue-900">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-blue-900">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12h.01M12 12h.01M9 12h.01M17 16h-6m0 0h-2m2 0v-2m0 2v2m6 0h-2m0 0v-2m0 2v2m-6-2H7m0 0v-2m0 2v2m0-4a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <button
             onClick={notify}
              className="w-full py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-md hover:from-orange-500 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500" >
              Login
            </button>
          </form>
          {/* <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-900">
              Solicitar Cambio de clave
            </a>
            <a href="#" className="text-blue-900">
              Soporte
            </a>
          </div> */}
        </div>
      </main>
      <footer className="p-4 bg-white shadow-md text-center">
        <p className="text-sm">Versión 1.2.3 Beta</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default LoginAdmin;
