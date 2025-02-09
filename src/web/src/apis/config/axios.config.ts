import axios from 'axios';

import { getAccessToken } from '../token';

const baseURL = `${import.meta.env.VITE_APP_API_URL}`;
console.log(baseURL)
const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getAccessToken() || ''}`,
        'Content-Type': 'application/json',
    },
});

export default api;
