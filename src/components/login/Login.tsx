import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@components/ui//Card';
import CardContent from '@components/ui//CardContent';
import CardHeader from '@components/ui/CardHeader';
import { Button } from '@components/ui/Button';
import { Input} from '@components/ui/Input'
import loginImage from '../../assets/img/img-login.jpg';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch } from '@components/ui/Switch';
// import { Alert, AlertDescription, AlertTitle } from "../../../@/components/ui/alert"

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para manejar el login
  };

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
                <Switch/>
                <span className="ml-2 text-sm text-gray-600">Remember Me</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-2 rounded-md shadow-md hover:from-orange-500 hover:to-red-600">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/register" className="text-sm text-indigo-600 hover:text-indigo-500">
                No posee una cuenta? Crea una Cuenta
              </Link>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <Link onClick={notify} to="#" className="hover:text-gray-900">
               Cambio de clave
              </Link>
              <Link to="/support" className="hover:text-gray-900">
                Soporte
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
