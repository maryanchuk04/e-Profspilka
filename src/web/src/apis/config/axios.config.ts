import axios from 'axios';

import { getAccessToken } from '../token';

const baseURL = `${import.meta.env.VITE_APP_API_URL}`;

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getAccessToken() || ''}`,
        'Content-Type': 'application/json',
    },
});

export default api;
