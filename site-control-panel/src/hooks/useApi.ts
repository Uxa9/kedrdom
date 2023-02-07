import axios, { AxiosInstance } from 'axios';

const baseURL = "http://localhost:5000";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'content-type': 'application/json',
    },
});

export {
    api
};
