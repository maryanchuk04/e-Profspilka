import { Question } from '@/models/question';

import api from './config/api.config';

const endpoint = '/question';

export const getQuestions = async (): Promise<Question[]> => {
    return await api.get(endpoint);
};
