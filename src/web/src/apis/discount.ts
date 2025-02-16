import api from './config/axios.config';

const endpoint = '/discount';

export const getAllDiscounts = async () => {
    return await api.get(endpoint);
};

export const getQrCode = async (discountId: string) => {
    return await api.get(`${endpoint}/code/${discountId}`);
};

export const getSharedDiscounts = async () => {
    return await api.get(`${endpoint}/shared`);
};

export const verifyDiscount = async (discountId: string, discountCodeId: string) => {
    try {
        const { data } = await api.get(`${endpoint}/code/verify/${discountId}/${discountCodeId}`);
        return data;
    } catch (error) {
        console.error('An error occurred during verifying discount:', error);
        throw error;
    }
};
