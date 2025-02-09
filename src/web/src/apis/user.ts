import api from './config/axios.config';

const endpoint = '/user';

export const getCurrentUserInfo = async () => {
    return api.get(endpoint);
};
