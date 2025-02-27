import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${''}`,
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    console.log(`[OUTGOING] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(`[ERROR] ${error?.config?.method?.toUpperCase()} ${error?.config?.baseURL}${error?.config?.url}`);
            console.error(`Status: ${error.response.status}`);
            console.error(`Response:`, error.response.data);
        } else if (error.request) {
            console.error(`[NETWORK ERROR] ${error.config.method?.toUpperCase()} ${error.config.baseURL}${error.config.url}`);
            console.error("No response received");
        } else {
            console.error("[AXIOS ERROR]", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
