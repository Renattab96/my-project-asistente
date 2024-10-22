import axiosInstance from "src/api/axiosInstance";

export const getProtectedData = async (url: string) =>  {
    try {
        const response = await axiosInstance.get(url);
        console.log("response", response.data)
        return response.data;
    } catch (error) {
        console.error('Error obteniendo datos protegidos:', error);
        throw error;
    }
};