import api from './config/axios.config';

const endpoint = '/partners';

export const getPartners = async () => {
    return await api.get(endpoint);
};
