import axiosInstance from "src/api/axiosInstance";

export const changeAdmminPassword = async (newPassword: string, id: string) => {
    try {
        const response = await axiosInstance.put(`/users/reset-password/${id}`, {
            newPassword
        });
        return response.data
    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        throw error;
    }
};