import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const clearUserData = async () => {
    return await axios.post(`${API_URL}/clear`);
};

export const createUser = async (name, grid) => {
    return await axios.post(`${API_URL}/create`, { name, grid });
};

export const markNumber = async (name, number) => {
    return await axios.post(`${API_URL}/mark`, { name, number });
};

export const checkWin = async (name) => {
    return await axios.post(`${API_URL}/checkWin`, { name });
};
