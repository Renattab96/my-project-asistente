import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { RiAccountBoxLine } from "react-icons/ri";
import { MdOutlineHistoryEdu } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/img/logo-asistente.ico';
import { DialogLogout } from '@components/ui/custom/DialogLogut';
import { handleDownloadPDF } from 'src/services/downloadPDF.services';

const NavbarAdmin: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-500';
  };

  const onClose = () => {
    setOpen(false);
  }

  const onOpen = () => {
    setOpen(true);
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <DialogLogout open={open} onClose={onClose} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} className="h-15 w-10 mr-3 " alt="Asistente Logo" /> {/* Agrega tu logo aquí */}
            <Link to="/" className="text-xl font-bold">ASISTENTE ONLINE</Link>
          </div>
          <div className="hidden md:flex md:space-x-8 md:ml-10">
            <Link
              // onClick={notify} 
              to={'/support/user_data/'}
              className={`${isActive('/support/user_data/:id')} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center`}
            >
              <RiAccountBoxLine className="mr-1" /> CUENTA
            </Link>
            <Link
              to={"/support/gestion"}
              className={`${isActive('/support/gestion')} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center`}
            >
              <MdOutlineHistoryEdu className="mr-1" /> GESTION
            </Link>
            <button
              onClick={onOpen} // Cambiamos Link por button y llamamos a handleLogout
              className="hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <FaSignOutAlt className="mr-1" /> CERRAR SESION
            </button>
            <div className='hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px" className='cursor-pointer' onClick={handleDownloadPDF}>
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 
                12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 
                36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 
                0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 
                36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"/>
              </svg>
            </div>
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            // onClick={notify} 
            to={'/support/user_data/'}
            className={`${isActive('/support/user_data/:id')} hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center`}
          >
            <RiAccountBoxLine className="mr-1" /> CUENTA
          </Link>
          <Link
            to={"/support/gestion"}
            className={`${isActive('/support/gestion')} hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center`}
          >
            <MdOutlineHistoryEdu className="mr-1" /> GESTION
          </Link>
          <button
            onClick={onOpen} // Cambiamos Link por button y llamamos a handleLogout
            className="hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <FaSignOutAlt className="mr-1" /> CERRAR SESION
          </button>
          <div className='hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px" className='cursor-pointer' onClick={handleDownloadPDF}>
              <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 
                12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 
                36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 
                0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 
                36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"/>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
