import { User } from '@/models/user';

import api from './config/axios.config';

const endpoint = '/user';

export const getCurrentUserInfo = async (): Promise<User> => {
    try {
        const { data } = await api.get<User>(endpoint);

        return data;
    } catch (error) {
        console.error(`Error while fetching current user info: ${error}`);
        throw error;
    }
};
