import axiosInstance from "src/api/axiosInstance";

export const deleteUser = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/users/delete/${id}`);
        
        return response.data
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
};