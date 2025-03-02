import { AxiosResponse } from 'axios';

import api from './config/api.config';

const endpoint = '/partners';

export const getPartners = async (): Promise<AxiosResponse<any[]>> => {
    return await api.get(endpoint);
};
