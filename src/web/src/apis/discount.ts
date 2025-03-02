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

export const getSharedDiscounts = async () => {
    return await api.get(`${endpoint}/shared`);
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

export const getUserDiscounts = async () => {
    try {
        const res = await api.get(`${endpoint}/user`);
        return res;
    } catch (error) {
        console.error('❌ An error occurred during getting discounts for user:', error);
        throw error;
    }
};
