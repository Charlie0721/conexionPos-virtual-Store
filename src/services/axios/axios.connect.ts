import axios, { type AxiosInstance } from "axios";
import { URI_API } from '../environmentVariables';

const axiosInstance: AxiosInstance = axios.create({


    baseURL: URI_API,
    headers: {

        'Content-Type': 'application/json',
    },
});

let token: string | null = null;

axiosInstance.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        token = response.data.token;
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance