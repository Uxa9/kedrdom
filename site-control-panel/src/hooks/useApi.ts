import axios, { AxiosInstance } from 'axios';

const baseURL = "https://kedrdom27.ru:5000";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'content-type': 'application/json',
    },
});

export {
    api
};
