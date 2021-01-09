import axios from "axios";

const baseUrl = "";
const axiosWithOptions = axios.create({
    withCredentials: true
})

const api = {
    pet: {
        getPetById: (petId) => {
            return axiosWithOptions.get(`${baseUrl}/pet/${petId}`);
        },
        adopt: (petId) => {
            return axiosWithOptions.post(`${baseUrl}/pet/${petId}/adopt`);
        },
        foster: (petId) => {
            return axiosWithOptions.post(`${baseUrl}/pet/${petId}/foster`);
        },
        save: (petId) => {
            return axiosWithOptions.post(`${baseUrl}/pet/${petId}/save`);
        },
        return: (petId) => {
            return axiosWithOptions.post(`${baseUrl}/pet/${petId}/return`);
        },
        removedSavedPet: (petId) => {
            return axiosWithOptions.delete(`${baseUrl}/pet/${petId}/save`);
        },
        updatePet: (petId, updatedPet) => {
            return axiosWithOptions.put(`${baseUrl}/pet/${petId}`, updatedPet);
        }
    },
    user: {
        getPets: (userId) => {
            return axiosWithOptions.get(`${baseUrl}/pet/user/${userId}`);
        },
        getUserDetails: (userId) => {
            return axiosWithOptions.get(`${baseUrl}/user/${userId}`);
        },
        updateUser: (updatedUser) => {
            return axiosWithOptions.put(`${baseUrl}/user/${updatedUser.id}`, updatedUser);
        }
    },
    search: {
        findAll: (adoptionStatus, type, height, weight, name) => {
            return axiosWithOptions.get(`${baseUrl}/pet?adoptionStatus=${adoptionStatus}&type=${type}&height=${height}&weight=${weight}&name=${name}`);
        }
    },
    authentication: {
        login: (email, password) => {
            return axiosWithOptions.post(`${baseUrl}/authentication/login`, {email, password});
        },
        signOut: () => {
            return axiosWithOptions.get(`${baseUrl}/authentication/signout`);
        },
        signUp: (newUser) => {
            return axiosWithOptions.post(`${baseUrl}/authentication/signup`, newUser);
        }
    },
    admin: {
        addPet: (newPet) => {
            return axiosWithOptions.post(`${baseUrl}/pet`, newPet); 
        },
        getAllUsers: (allUsers) => {
            return axiosWithOptions.get(`${baseUrl}/user`, allUsers)
        }
    }
};

export default api;