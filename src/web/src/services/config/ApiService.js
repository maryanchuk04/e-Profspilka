import { Token } from '../TokenService';
import api from './axios.config';

export class ApiService {
    async post(url, data) {
        const call = async () => {
            return await api.post(url, data, { withCredentials: true });
        };

        let res = null;

        try {
            res = await call(url);
        } catch (error) {
            if (error.response.status === 401 && (await this.refreshHandler())) {
                // one more try
                res = await call(url);
            }
        }
        return res;
    }

    async get(url, token = null) {
        const call = () => {
            return api.get(url, {
                headers: {
                    Authorization: `Bearer ${token ?? Token.get() ?? ''}`,
                },
            });
        };

        let res = null;

        try {
            res = await call(url);
        } catch (error) {
            if (error.response.status === 401 && (await this.refreshHandler())) {
                // one more try
                res = await call(url);
            }
        }
        return res;
    }

    async put(url, data) {
        const call = async () => {
            return await api.put(url, data, { withCredentials: true });
        };

        let res = null;

        try {
            res = await call(url);
        } catch (error) {
            if (error.response.status === 401 && (await this.refreshHandler())) {
                // one more try
                res = await call(url);
            }
        }
        return res;
    }

    async delete(url) {
        return api.delete(url, { withCredentials: true });
    }

    refreshHandler = async () => {
        Token.remove();
        const res = await api.post('authenticate/refresh-token');
        console.log(res);
        if (res.status !== 200) {
            return false;
        }

        Token.set(res.data.token);

        return true;
    };
}
