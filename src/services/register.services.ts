import axiosInstance from "src/api/axiosInstance";

export const register = async (userData: {
    username: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
    // role: string;
  }) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
  
      // Aquí normalmente no recibirías un token, pero podrías manejar la lógica adicional
      return response;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  };