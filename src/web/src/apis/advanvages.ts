import { Advantage } from '@/models/advantage';

import api from './config/api.config';

const endpoint = '/advantage';

export const getAdvantages = async (): Promise<Advantage[]> => {
    try {
        const advantages = await api.get<Advantage[]>(endpoint);

        return advantages;
    }
    catch(err) {
        return [];
    }
};