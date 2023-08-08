import axios, { AxiosInstance } from "axios";
import { URI_API } from '../environmentVariables';
import { useloginUserStore } from '../../users/stores/login.store'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: URI_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) {
            config.headers['Authorization'] = `Bearer ${storedToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        const loginUserStore = useloginUserStore()
        const newToken = loginUserStore.jwt
        if (newToken) {
            sessionStorage.setItem('authToken', newToken);
        } else {
            sessionStorage.removeItem('authToken');
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
