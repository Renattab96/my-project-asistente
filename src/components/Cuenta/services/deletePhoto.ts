import axiosInstance from "src/api/axiosInstance";
// Puedes usar un genérico para tipar la respuesta que esperas
export const deletePhoto = async (userId: string): Promise<string> => {
    try {
        const response = await axiosInstance.put(`/users/delete-profile-picture`, {
            userId,
        });
        return response.data.profilePicture
    } catch (error) {
        console.error('Error al actualizar Foto de Perfil:', error);
        throw error;
    }
};