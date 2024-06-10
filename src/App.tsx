import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import LoginAdmin from "./components/LoginAdmin/loginAdmin" ;
import ListaUsuario from  "./components/ListaUsuarios/ListaUsuarios";
import Historic from "./components/historico/HistoryPage";
import Cuenta from "./components/Cuenta/Cuenta";
import Balance from "./components/balance/Balance";
import Register from "./components/registro/Register";
import Task from "./components/tarea/Tarea";




function App() {
  return (
    <div>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/support' element={<LoginAdmin />} /> 
        <Route path='/support/gestion' element={< ListaUsuario />} /> 
        <Route path="/historico" element={<Historic />} />
        <Route path="/tarea" element={<Task />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/user_data/:id" element={<Cuenta />} />
      </Routes>
      {/* </BrowserRouter> */}
     
    </div>
  );
}

export default App;
