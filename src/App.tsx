import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Cuenta from "./components/Cuenta/Cuenta";
import Register from "./components/registro/Register";
import LoginAdmin from "./components/LoginAdmin/loginAdmin" ;
import AdminUserTable from "./components/ListaUsuarios/AdminUserTable";
import TaskNew from "@components/tarea/TareaNew";
import BalanceNew from "../src/components/balance/balanceNew";
import HistoryPage from "@components/historico/HistoryPage";

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
        <Route path="/cuenta" element={<Cuenta />} />

        {/* Inicio Pantalla sin api   */}
        <Route path="/historico" element={<HistoryPage/>} />
        <Route path="/tarea" element={<TaskNew/>} />  
        <Route path="/balance" element={<BalanceNew />} />   
        {/* <Route path="/cuenta" element={<CuentaNew />} />  */}
        <Route path='/support' element={<LoginAdmin />} />  
        <Route path='/support/gestion' element={< AdminUserTable />} />   
        <Route path="/support/user_data" element={<Cuenta />} />
        {/*Fin de Pantalla sin api  */}

      </Routes>


      {/* </BrowserRouter> */}
     
    </div>
  );
}

export default App;
