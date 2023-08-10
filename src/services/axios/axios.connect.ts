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
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            config.headers['Authorization'] = `Bearer ${storedToken}`;
        }
        return config;
    },
    (error) => {
        console.log("error desde interceptors request", error)
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        const newToken = response.data.access_token;
        if (newToken !== undefined && newToken !== null) {
            localStorage.setItem('authToken', newToken);
            const loginUserStore = useloginUserStore();
            loginUserStore.jwt = newToken;
            console.log("desde axios", loginUserStore.jwt)
        }
        return response;
    },
    (error) => {
        console.log("error desde interceptors response", error)
        return Promise.reject(error);
    }
);
export default axiosInstance;
