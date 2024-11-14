// src/hooks/useLogout.ts

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from 'src/services/logout.services';

export const useLogout = () => {
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            await logout();
            toast.success('¡Ha cerrado sesión!', { 
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/'); // Redirige al login
        } catch (error) {
            console.error('Error en el logout:', error);
            toast.error('Error al cerrar sesión', { 
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [navigate]);

    return { handleLogout };
};
