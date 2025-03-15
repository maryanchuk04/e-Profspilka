import { Discount, DiscountCode, VerifyDiscountResult } from '@/models/discount';

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

export const getDiscountById = async (id: string): Promise<Discount | null> => {
    try {
        const discount = await api.get<Discount>(`${endpoint}/${id}`);

        return discount;
    } catch (err) {
        return null;
    }
};

export const getQrCode = async (discountId: string): Promise<DiscountCode> => {
    try {
        const data = await api.get<DiscountCode>(`${endpoint}/code/${discountId}`);

        return data;
    } catch (error) {
        console.error('An error occurred during getting QR code:', error);
        throw error;
    }
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

export const verifyDiscount = async (discountId: string, discountCodeId: string): Promise<VerifyDiscountResult> => {
    try {
        const data = await api.get<VerifyDiscountResult>(`${endpoint}/code/verify/${discountId}/${discountCodeId}`);
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
