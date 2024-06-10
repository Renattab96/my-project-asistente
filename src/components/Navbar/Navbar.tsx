import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt,FaPager,FaTasks } from 'react-icons/fa';

import { RiAccountBoxLine } from "react-icons/ri";
import { MdOutlineHistoryEdu } from "react-icons/md";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold">ASISTENTE ONLINE</Link>
          </div>
          <div className="hidden md:flex md:space-x-8 md:ml-10">
          <Link to={'/user_data/:id'} className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
          <RiAccountBoxLine className="mr-1" />   CUENTA
          </Link>
          <Link to="/historico" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
          <MdOutlineHistoryEdu className="mr-1" /> HISTORICO
          </Link>
          <Link to={'/balance'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center">
            <FaPager className='mr-1'/>GASTOS
          </Link>
          <Link to={'/tarea'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center">
          <FaTasks className='mr-1'/>TAREA
          </Link>
          <Link to="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <FaSignOutAlt className="mr-1" /> CERRAR SESION
            </Link>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
        <Link to={'/user_data/:id'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center">
          <RiAccountBoxLine className="mr-1" />   CUENTA
          </Link>
          <Link to="/historico" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center">
          <MdOutlineHistoryEdu className="mr-1" /> HISTORICO
          </Link>
          <Link to={'/balance'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center">
            <FaPager className='mr-1'/>GASTOS
          </Link>
          <Link to={'/tarea'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center">
          <FaTasks className='mr-1'/>TAREA
          </Link>
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center">
            <FaSignOutAlt className="mr-1" /> CERRAR SESION
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
