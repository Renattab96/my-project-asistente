import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import "./style.css";

const BalanceNew: React.FC = () => {
  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [tipo, setTipo] = useState("Ingreso");
  const [tasks, setTasks] = useState([
    { _id: "1", concepto: "Salario", monto: "5000000", tipo: "Ingreso" },
    { _id: "2", concepto: "Alquiler", monto: "1500000", tipo: "Egreso" },
    { _id: "3", concepto: "Venta de productos", monto: "2000000", tipo: "Ingreso" },
    { _id: "4", concepto: "Compra de insumos", monto: "500000", tipo: "Egreso" }
  ]);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nuevoPago = { _id: Math.random().toString(36).substr(2, 9), concepto, monto, periodo, tipo };
    setTasks([...tasks, nuevoPago]);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-5">
        <h1 className="text-3xl font-bold mb-6 border-blue-900 rounded-md dark:text-gray-300 dark:border-gray-600">Gastos</h1>
        <div className="grid grid-cols-1 md:grid-cols-[40%,60%] gap-4 px-4">
          <div className="flex justify-center">
            <form
              onSubmit={formSubmitHandler}
              className="w-full md:w-[32rem] border-2 border-blue-300 p-4 rounded-lg flex flex-col items-center gap-y-8"
            >
              <h2 className="font-semibold text-blue-400">Balance de Saldo Diario</h2>
              <div className="gap-y-4 flex flex-col">
                <div className="w-full grid grid-cols-2 gap-x-8">
                  <h3 className="text-blue-900 font-semibold text-left">Ingresos</h3>
                  <p className="text-green-400 font-semibold">Gs. 7,000,000</p>
                </div>
                <div className="w-full grid grid-cols-2 gap-x-8">
                  <h3 className="text-blue-900 font-semibold text-left">Egresos</h3>
                  <p className="text-red-400 font-semibold">Gs. 2,000,000</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[35%,65%] gap-y-4 items-center">
                <label className="font-bold text-blue-400">Concepto</label>
                <input
                  className="text-base font-normal text-blue-900 border-2 border-black rounded-lg px-3 h-9 flex "
                  type="text"
                  value={concepto}
                  onChange={(e) => setConcepto(e.target.value)}
                />
                <label className="font-bold text-blue-400">Monto</label>
                <input
                  className="text-base font-normal text-blue-900 border-2 border-black rounded-lg px-3 h-9 flex "
                  type="text"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
                <label className="font-bold text-blue-400">Periodo</label>
                <input
                  className="text-base font-normal text-blue-900 border-2 border-black rounded-lg px-3 h-9 flex "
                  type="month"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                />
              </div>

              <div className="flex gap-x-4 md:gap-x-14">
                <button
                  type="button"
                  onClick={() => setTipo("Ingreso")}
                  className={`btn-ingreso ${tipo === "Ingreso" ? "bg-green-500" : "bg-gray-300"}`}
                >
                  Ingreso
                </button>
                <button
                  type="button"
                  onClick={() => setTipo("Egreso")}
                  className={`btn-egreso ${tipo === "Egreso" ? "bg-red-500" : "bg-gray-300"}`}
                >
                  Egreso
                </button>
              </div>
              <button type="submit" className="btn-submit">Agregar Tarea</button>
            </form>
          </div>

          <div className="w-full md:w-[32rem]">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default BalanceNew;
