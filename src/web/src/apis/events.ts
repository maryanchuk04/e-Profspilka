import { AxiosResponse } from 'axios';

import { Event } from '@/models/event';

import api from './config/axios.config';

const endpoint = '/event';

export const getEvents = async (): Promise<AxiosResponse<Event[]>> => {
    return await api.get(endpoint);
};

export const getEventById = async (id: string): Promise<AxiosResponse<Event>> => {
    return await api.get(`${endpoint}/${id}`);
};
