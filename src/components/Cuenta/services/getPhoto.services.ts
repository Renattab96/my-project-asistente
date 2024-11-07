import axiosInstance from "src/api/axiosInstance";

export const getPhoto = async (id: string): Promise<string> =>  {
    try {
        const response = await axiosInstance.get(`/users/profile-picture/${id}`);
        console.log("response", response.data)
        return response.data.profilePicture;
    } catch (error) {
        console.error('Error obteniendo datos protegidos:', error);
        throw error;
    }
};