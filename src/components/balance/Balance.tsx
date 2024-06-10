// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./style.css";
import Navbar from '../Navbar/Navbar';
// import { prueba } from "../utilities/utilities";

const Balance = () => {
  // const [concepto, setConcepto] = useState("");
  // const [monto, setMonto] = useState("");
  // const [periodo, setPeriodo] = useState("");
  // const [tipo, setTipo] = useState("Ingreso");
  // const [tasks, setTasks] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/pagos/", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res);
  //       setTasks(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // const formSubmitHandler = (e) => {
  //   e.preventDefault();
  //   const nuevoPago = { concepto, monto, periodo, tipo };

  //   axios
  //     .post("http://localhost:8000/api/crearpagos", nuevoPago, {
  //       withCredentials: true,
  //       Credential: "include",
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/balance");
  //       setTasks([...tasks, res.data]); // Actualiza la lista de tareas con el nuevo pago
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold mb-6 border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">Gastos</h1>
        <div className="grid grid-cols-1 md:grid-cols-[40%,60%] gap-4 px-4">
          <div className="flex justify-center">
            <form
              // onSubmit={formSubmitHandler}
              className="w-full md:w-[32rem] border-2 border-blue-300 p-4 rounded-lg flex flex-col items-center gap-y-8"
            >
              <h2 className="font-semibold text-blue-400">Balance de Saldo Diario</h2>
              <div className="gap-y-4 flex flex-col">
                <div className="w-full grid grid-cols-2 gap-x-8">
                  <h3 className="text-blue-900 font-semibold text-left">Ingresos</h3>
                  <p className="text-green-400 font-semibold">Gs. 200.000</p>
                </div>
                <div className="w-full grid grid-cols-2 gap-x-8">
                  <h3 className="text-blue-900 font-semibold text-left">Egresos</h3>
                  <p className="text-red-400 font-semibold">Gs. 200.000</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[35%,65%] gap-y-4 items-center">
                <label className="font-bold text-blue-400">Concepto</label>
                <input
                  className="text-base font-normal text-blue-900 border-2 border-black rounded-lg px-3 h-9 flex "
                  type="text"
                  // value={concepto}
                  // onChange={(e) => setConcepto(e.target.value)}
                />
                <label className="font-bold text-blue-400">Monto</label>
                <input
                  className="text-base font-normal text-blue-900 border-2 border-black rounded-lg px-3 h-9 flex "
                  type="text"
                  // value={monto}
                  // onChange={(e) => setMonto(e.target.value)}
                />
                <label className="font-bold text-blue-400">Periodo</label>
                <input
                  className="text-base font-normal text-blue-900 border-2 border-black rounded-lg px-3 h-9 flex "
                  type="month"
                  // value={periodo}
                  // onChange={(e) => setPeriodo(e.target.value)}
                />
              </div>

              <div className="flex gap-x-4 md:gap-x-14">
                <button
                  type="button"
                  // onClick={() => setTipo("Ingreso")}
                  className="btn-ingreso"
                >
                  Ingreso
                </button>
                <button
                  type="button"
                  // onClick={() => setTipo("Egreso")}
                  className="btn-egreso"
                >
                  Egreso
                </button>
              </div>
              {/* <button type="submit" className="btn-submit">Agregar Tarea</button> */}
            </form>
          </div>

          {/* <div className="w-[32rem]">
            <h2>Historial</h2>
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`card ${task.tipo === "Ingreso" ? "ingreso" : "egreso"}`}
              >
                <h4>{task.concepto}</h4>
                <p>Gs.{task.monto}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Balance;
