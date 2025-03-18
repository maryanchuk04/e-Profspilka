

import { Partner } from '@/models/partners';

import api from './config/api.config';

const endpoint = '/partners';

export const getPartners = async (): Promise<Partner[]> => {
    try {
        return await api.get<Partner[]>(endpoint);
    } catch (error) {
        console.warn('Failed to get partners:', error);

        return [];
    }
};
