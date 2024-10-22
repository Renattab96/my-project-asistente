import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
// import HistoryPage from "@components/historico/HistoryPage";
import Cuenta from "./components/Cuenta/Cuenta";
// import Balance from "./components/balance/Balance";
import Register from "./components/registro/Register";
// import Task from "./components/tarea/Tarea";
// Pantalla sin integracion 
import LoginAdmin from "./components/LoginAdmin/loginAdmin" ;
import AdminUserTable from "./components/ListaUsuarios/AdminUserTable";
import DetalleAdmin from "@components/DetalleAdmin/DetalleAdmin";
import TaskNew from "@components/tarea/TareaNew";
import BalanceNew from "../src/components/balance/balanceNew";
import CuentaNew from "@components/Cuenta/CuentaNew";
import HistoryPageNew from './../src/components/historico/HistoryPageNew'




function App() {

  return (
    <div>
      {/* <BrowserRouter> */}

      <Routes>
         {/* Seccion pantalla que se integran por axios  */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/historico" element={<HistoryPage/>} />   */}
         {/* <Route path="/tarea" element={<Task/>}/>  */}
        {/* <Route path="/balance" element={<Balance />} />  */}
        <Route path="/cuenta/:id" element={<Cuenta />} />

        {/* Inicio Pantalla sin api   */}
        <Route path="/historico" element={<HistoryPageNew/>} />
        <Route path="/tarea" element={<TaskNew/>} />  
        <Route path="/balance" element={<BalanceNew />} />   
        <Route path="/cuenta/:id" element={<CuentaNew />} /> 
        <Route path='/support' element={<LoginAdmin />} />  
        <Route path='/support/gestion' element={< AdminUserTable />} />   
        <Route path="/support/user_data/:id" element={<DetalleAdmin />} />
        {/*Fin de Pantalla sin api  */}

      </Routes>


      {/* </BrowserRouter> */}
     
    </div>
  );
}

export default App;
