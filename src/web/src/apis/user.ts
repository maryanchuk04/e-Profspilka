import { User } from '@/models/user';

import api from './config/api.config';

const endpoint = '/user';

export const getCurrentUserInfo = async (): Promise<User> => {
    try {
        const res = await api.get(endpoint) as User;

        return res;
    } catch (error) {
        console.error(`Error while fetching current user info: ${error}`);
        throw error;
    }
};
