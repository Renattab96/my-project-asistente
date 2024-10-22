import axios from 'axios';
import { store } from '../redux/store'; // Importa tu store de Redux
import { clearToken, setToken } from '../redux/states/auth.state'; // Importa la acción para setear el token

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Añadir un interceptor de solicitud (request interceptor)
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener el token desde el store de Redux
    const state = store.getState();
    const token = state.auth.token;

    // Si existe un token, añadirlo a los headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Añadir un interceptor de respuesta (response interceptor)
axiosInstance.interceptors.response.use(
  (response) => {
    // Verificar si la respuesta contiene un nuevo token
    const newToken = response?.data?.token;

    // Si la respuesta tiene un token y este no está en Redux, lo guardamos
    if (newToken && store.getState().auth.token !== newToken) {
      store.dispatch(setToken(newToken));
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Si recibes un error 401, puedes limpiar el token y redirigir al login
      store.dispatch(clearToken());
      window.location.href = '/login'; // Redirige al login o muestra un mensaje
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;