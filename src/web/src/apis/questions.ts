import api from './config/axios.config';

const endpoint = '/question';

export const getQuestions = async () => {
    return await api.get(endpoint);
};
