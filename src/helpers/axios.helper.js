import axios from 'axios';

import { StorageService } from "../services";


const axiosInstance = axios.create();

function apiSetHeader (name, value) {
    if (value) {
        axiosInstance.defaults.headers[name] = value;
    }
}

axiosInstance.interceptors.request.use(async(config) => {
    const JWTToken = await new StorageService().getItem('access_key')

    if (JWTToken) {
        config.headers['Authorization'] = JWTToken;
    } else {
        // Тут пишем редирект если не авторизован
    }

    return config;
});


export {axiosInstance, apiSetHeader};
