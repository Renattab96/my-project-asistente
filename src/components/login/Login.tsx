import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@components/ui//Card';
import CardContent from '@components/ui//CardContent';
import CardHeader from '@components/ui/CardHeader';
import { Button } from '@components/ui/Button';
import { Input} from '@components/ui/Input'
import loginImage from '../../assets/img/img-login.jpg';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from 'src/services/login.services';
import { useDispatch } from 'react-redux';
import { setRole, setToken } from 'src/redux/states/auth.state';
// import { Alert, AlertDescription, AlertTitle } from "../../../@/components/ui/alert"

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      dispatch(setToken(response.token));
      dispatch(setRole(response.role));
      // Redireccionar al usuario a la página principal o al dashboard
      if(response.role === "admin") navigate('/support/gestion')
      else navigate('/tarea');

      // Mostrar un mensaje de éxito
      toast.success('Inicio de sesión exitoso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error('Error al iniciar sesión. Por favor, verifica tus credenciales.', {
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


  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Lógica para manejar el login
  // };

  // const notify = () => {
  //   toast.info('Funcionalidad en desarrollo', {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 flex items-center justify-center bg-white hidden md:flex">
        <img src={loginImage} alt="Login" className="object-cover h-full w-full" />
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-6 md:p-12">
        <Card className="max-w-md w-full p-6 md:p-8 shadow-lg rounded-lg bg-white">
          <CardHeader className="text-center mb-4">
            <h1 className="text-2xl font-bold">Bienvenidos</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                {/* <Switch/>
                <span className="ml-2 text-sm text-gray-600">Remember Me</span> */}
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-2 rounded-md shadow-md hover:from-orange-500 hover:to-red-600">
                Login
              </Button>
            </form>
            {/* Link de Acceso a seccion de Soporte  */}
            <div className="mt-4 text-center">
              <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-500">
              <p className="text-sm font-normal text-blue-900 mb-8 underline">No posee una cuenta? Crea una Cuenta</p> 
              </Link>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              {/* <Link onClick={notify} to="#" className="hover:text-gray-900">
              <p className="text-sm font-normal text-blue-900 mb-8 underline">Cambio de clave</p>
              </Link> */}
              <Link to="/support" className="hover:text-gray-900">
              <p className="text-sm font-normal text-blue-900 mb-8 underline"> Soporte</p>
              </Link>
            
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
