import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://localhost:4000/',
    withCredentials: true,
});

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    register(name: string, email: string, password: string) {
        return instance.post(`auth/register`, { name, email, password });
    },
    login(email: string, password: string) {
        return instance.post(`auth/login`, { email, password });
    },
    logout() {
        return instance.post(`auth/logout`);
    },
};
