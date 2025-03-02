

import { Event } from '@/models/event';

import api from './config/api.config';

const endpoint = '/event';

export const getEvents = async (): Promise<Event[]> => {
    return await api.get(endpoint);
};

export const getEventById = async (id: string): Promise<Event> => {
    return await api.get(`${endpoint}/${id}`);
};
