import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import HistoryPage from "@components/historico/HistoryPage";
import Cuenta from "./components/Cuenta/Cuenta";
import Balance from "./components/balance/Balance";
import Register from "./components/registro/Register";
import Task from "./components/tarea/Tarea";
import LoginAdmin from "./components/LoginAdmin/loginAdmin" ;
import AdminUserTable from "./components/ListaUsuarios/AdminUserTable";
import DetalleAdmin from "@components/DetalleAdmin/DetalleAdmin";




function App() {
  return (
    <div>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/historico" element={<HistoryPage/>} />
        <Route path="/tarea" element={<Task />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/user_data/:id" element={<Cuenta />} />
         <Route path='/support' element={<LoginAdmin />} />  
        <Route path='/support/gestion' element={< AdminUserTable />} />   
        <Route path="/support/user_data/:id" element={<DetalleAdmin />} />
      </Routes>
      {/* </BrowserRouter> */}
     
    </div>
  );
}

export default App;
