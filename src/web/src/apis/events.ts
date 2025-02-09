import api from './config/axios.config';

const endpoint = '/event';

export const getEvents = async () => {
    return await api.get(endpoint);
};

export const getEventById = async (id: string) => {
    return await api.get(`${endpoint}/${id}`);
};
