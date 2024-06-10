import React, {useState,useEffect} from 'react'
import userIcon from '../images/user-icon.png';
// import bgIcon from '../images/nanduti-login.jpg';

import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar';
// import userIcon from '../images/user-icon.png';
import axios from 'axios';

const UserData = () => {
      const {id} = useParams()
      const navigate = useNavigate()
 
    const [nombre,setnombre] = useState('')
    const [apellido,setapellido]=useState('')
    const [email,setemail] = useState('')
    const [cargo,setcargo] = useState('')
    const [telefono,settelefono] = useState('')
    const [sueldo_inicial,setsueldo] = useState('')
    const [tipo_cuenta,setcuenta] = useState('')  
  useEffect(() => {
        axios.get(`http://localhost:8000/api/usuario/${id}`)
        .then((res)=>{
          setnombre(res.data.nombre)
          setapellido(res.data.apellido)
          setemail(res.data.email)
          setcargo(res.data.cargo)
          settelefono(res.data.telefono)
          setsueldo(res.sueldo_inicial)
          setcuenta(res.data.tipo_cuenta)
          console.log(res)
      }).catch((err)=>{
          console.log(err)
      })
        

    },[id])

    const editHandler = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/actualizar-info/${id}`, {
            nombre,
            apellido,
            email,
            telefono,
            cargo,
            sueldo_inicial,
            tipo_cuenta
        }).then((res)=>{
            console.log(res);
            navigate('/user_data/:id')
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
       <Navbar/>
       <div>
      <div className="flex flex-wrap h-[100vh]">
        <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-4 ">

          <div className="flex flex-col justify-center items-center mt-20 m-20">
            <div className="shadow-2xl flex w-full flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
              <div className="bg-blue-100 flex h-32 w-full justify-center items-center rounded-xl bg-cover" >
                <div className=" bottom-10 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                  <img className="h-full w-full rounded-full" src={userIcon} alt="" />
                </div>
              </div>
              <div className=" mt-5 flex w-full flex-col items-center">
                <h1 className="text-lg md:text-2xl xl:text-3xl 2xl:text-3xl font-bold text-blue-900 ">Nombre y apellido: {nombre}{apellido} </h1>
                <br />
                <p className="text-sm md:text-xl xl:text-2xl 2xl:text-1xl font-normal  text-blue-900">Phone Number: {telefono} </p>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3 mb-4">

          {/* <!-- component --> */}
          <br />
          <br />
          <br />
          <br />
          <section className="shadow-2xl max-w-4xl p-6 mx-auto bg-white rounded-md text-gray-700 ">
            <br />
            <h1 className="text-3xl font-bold border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">Datos de la Cuenta </h1>
            <form  onSubmit={editHandler}>
              <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">
                <div>
                  <label className="text-2xl text-blue-900 dark:text-gray-200" for="username">First Name</label>
                  <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"onChange={(e)=>setnombre(e.target.value)}/>
                </div>

                <div>
                  <label className="text-2xl text-blue-900 dark:text-gray-200" for="username">Last Name</label>
                  <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"onChange={(e)=>setapellido(e.target.value)}  />
                </div>

                <div>
                  <label className="text-2xl text-blue-900 dark:text-gray-200" for="emailAddress">Email Address</label>
                  <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e)=>setemail(e.target.value)} />
                </div>

                <div>
                  <label className="text-2xl text-blue-900 dark:text-gray-200" for="number">Phone</label>
                  <input id="number" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-blue-900 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e)=>settelefono(e.target.value)} />
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
  )
}


export default UserData;
