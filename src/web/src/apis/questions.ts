import { AxiosResponse } from 'axios';

import { Question } from '@/models/question';

import api from './config/axios.config';

const endpoint = '/question';

export const getQuestions = async (): Promise<AxiosResponse<Question[]>> => {
    return await api.get(endpoint);
};
