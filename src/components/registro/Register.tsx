// import React, { useState } from 'react'
import { Link } from "react-router-dom";
// import logintres from '../../assets/img/nanduti-login.jpg';
import imgRegister from '../../assets/img/img-register.jpg';
// import axios from 'axios'
// import {useNavigate} from 'react-router-dom'

const Register = () => {
  //   const [nombre,setNombre] = useState('')
  //   const [apellido,setapellido]=useState('')
  //   const [email,setEmail] = useState('')
  //   const [password,setPassword] = useState('')
  //   const [confirmPassword,setConfirmPassword] = useState('')
  //   //  const [error, setError]= useState('');

  //   const navigate = useNavigate()

  //   const submitHandler = (e)=>{
  //       e.preventDefault()
  //       axios.post('http://localhost:8000/api/registro', {
  //           nombre,apellido, email, password, confirmPassword
  //       // })
  //       }, {withCredentials:true})
  //       .then((res)=>{
  //           navigate('/')
  //           return res.status(200)
  //           // console.log(res)
  //           // navigate('/sign_in')

  //       }).catch((err)=>{
  //           // console.log(err)
  //           return err.status(400)
  //       })
  //   }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex w-full lg:w-1/2 justify-around items-center border-2">
        <img
          src={imgRegister}
          className="w-full h-full object-cover"
          alt="nanduti-login"
        />
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white p-6 space-y-8">
        <div className="max-w-md w-full">
          <form
            className="bg-grey rounded-md"
            // onSubmit={submitHandler}
          >
            <div className="bg-white p-4 px-4 md:p-8 mb-6">
              <h1 className="text-blue-900 font-bold text-3xl mb-3">Crea una cuenta</h1>
              
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                <div>
                  <label htmlFor="full_name" className="text-2xl text-blue-900">Nombre/s</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="h-14 border mt-1 rounded px-4 w-full bg-gray-50 border-blue-900 placeholder-blue-900 rounded-2xl"
                    placeholder="Ingrese su nombre"
                    // onChange={(e)=>setNombre(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="full_name" className="text-2xl text-blue-900">Apellido/s</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    className="h-14 border mt-1 rounded px-4 w-full bg-gray-50 border-blue-900 placeholder-blue-900 rounded-2xl"
                    placeholder="Ingrese su Apellido"
                    // onChange={(e)=>setapellido(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-2xl text-blue-900">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="h-14 border mt-1 rounded px-4 w-full bg-gray-50 border-blue-900 placeholder-blue-900 rounded-2xl"
                    placeholder="email@domain.com"
                    // onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-2xl text-blue-900">contraseña</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="h-14 border mt-1 rounded px-4 w-full bg-gray-50 border-blue-900 placeholder-blue-900 rounded-2xl"
                    placeholder="contraseña"
                    // onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirm_password" className="text-2xl text-blue-900">Repite contraseña</label>
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    className="h-14 border mt-1 rounded px-4 w-full bg-gray-50 border-blue-900 placeholder-blue-900 rounded-2xl"
                    placeholder="ingrese nuevamente la contraseña"
                    // onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="text-right">
                  <button className="block w-full bg-orange-600 mt-5 py-3 rounded-2xl hover:bg-orange-700 hover:-translate-y-1 transition-all duration-500 text-white text-2xl font-semibold mb-2">
                    Registrate
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/">
                <p className="text-sm font-normal text-blue-900 mb-8">Inicia Sesion</p>
              </Link>
            </div>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default Register;
