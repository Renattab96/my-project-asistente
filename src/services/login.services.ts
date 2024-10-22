import axiosInstance from 'src/api/axiosInstance'; // Usa la instancia de axios ya configurada
import { store } from '../redux/store';
import { setToken } from '../redux/states/auth.state';

// Función para el login
export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password,
        });

        // Si el login es exitoso, recibes un token
        const token = response.data.token;

        // Almacenar el token en Redux
        store.dispatch(setToken(token));

        return response.data; // Devuelve la data recibida
    } catch (error) {
        console.error('Error en el login:', error);
        throw error;
    }
};