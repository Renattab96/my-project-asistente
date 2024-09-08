// src/frontend/api/axiosInstance.ts
import axios from 'axios';

// Obtener el token de donde lo tengas almacenado
const token = localStorage.getItem('token'); // O sessionStorage.getItem('token')

// Crear una instancia de axios con el token configurado
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default axiosInstance;
