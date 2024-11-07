import axiosInstance from "src/api/axiosInstance";

export const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
        const response = await axiosInstance.put(`/users/change-password`, {
            currentPassword,
            newPassword
        });
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        throw error;
    }
};