import { Discount } from '@/models/discount';

import api from './config/api.config';

const endpoint = '/discount';

export const getAllDiscounts = async () => {
    try {
        const discounts = await api.get(endpoint);

        return discounts;
    } catch (err) {
        return [];
    }
};

export const getQrCode = async (discountId: string) => {
    return await api.get(`${endpoint}/code/${discountId}`);
};

export const getSharedDiscounts = async (): Promise<Discount[]> => {
    try {
        const res = await api.get<Discount[]>(`${endpoint}/shared`);
        return res;
    } catch (error) {
        console.error('An error occurred while fetching shared discounts:', error);
        return [];
    }
};

export const verifyDiscount = async (discountId: string, discountCodeId: string) => {
    try {
        const data = await api.get(`${endpoint}/code/verify/${discountId}/${discountCodeId}`);
        return data;
    } catch (error) {
        console.error('An error occurred during verifying discount:', error);
        throw error;
    }
};

export const getUserDiscounts = async (): Promise<Discount[]> => {
    try {
        const res = await api.get<Discount[]>(`${endpoint}/user`);
        return res;
    } catch (error) {
        console.error('❌ An error occurred during getting discounts for user:', error);
        throw error;
    }
};
