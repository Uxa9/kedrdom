import axios, { AxiosInstance } from 'axios';

const baseURL = "http://95.163.242.54:5000";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'content-type': 'application/json',
    },
});

export {
    api
};
