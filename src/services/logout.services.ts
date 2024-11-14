import axiosInstance from 'src/api/axiosInstance'; // Usa la instancia de axios ya configurada
import { store } from '../redux/store';
import { clearAuth } from 'src/redux/states/auth.state';
import { clearId } from 'src/redux/states/user.state';

// Función para el login
export const logout = async () => {
    try {
        const response = await axiosInstance.post('/auth/logout');
        store.dispatch(clearAuth());
        store.dispatch(clearId());

        return response.data; // Devuelve la data recibida
    } catch (error) {
        console.error('Error al cerrar sesion:', error);
        throw error;
    }
};