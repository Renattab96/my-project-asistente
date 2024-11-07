import axiosInstance from "src/api/axiosInstance";
// Puedes usar un genérico para tipar la respuesta que esperas
export const updatePhoto = async (userId: string, base64Image: string) => {
    try {
        const response = await axiosInstance.put(`/users/update-profile-picture`, {
            userId,
            base64Image
        });
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error al actualizar Foto de Perfil:', error);
        throw error;
    }
};