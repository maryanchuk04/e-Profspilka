import { getAuthCookiesHeaders } from './cookies';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const request = async <T>(
    method: string,
    endpoint: string,
    body?: any,
    customHeaders: HeadersInit = {}
): Promise<T> => {
    const url = `${baseURL}${endpoint}`;

    const authHeaders = await getAuthCookiesHeaders();

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...customHeaders,
            ...authHeaders,
        },
        credentials: 'include',
    };
    console.log(config);

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[ERROR] ${method} ${url}, Response: ${errorText}`);
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const text = await response.text();
        if (!text) {
            console.warn('⚠️ Empty response body');
            return null as T;
        }

        return JSON.parse(text) as T;
    } catch (error) {
        console.error(`❌ Fetch error (${method} ${url}):`, error);
        throw error;
    }
};

const api = {
    get: <T>(endpoint: string, headers?: HeadersInit) => request<T>('GET', endpoint, undefined, headers),
    post: <T>(endpoint: string, body: any, headers?: HeadersInit) => request<T>('POST', endpoint, body, headers),
    put: <T>(endpoint: string, body: any, headers?: HeadersInit) => request<T>('PUT', endpoint, body, headers),
    delete: <T>(endpoint: string, headers?: HeadersInit) => request<T>('DELETE', endpoint, undefined, headers),
};

export default api;
