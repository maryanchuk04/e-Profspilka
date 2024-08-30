import { ApiService } from './config/ApiService';
import api from './config/axios.config';

export class DiscountService {
    #apiUrl = '/discount/code';

    constructor() {
        this.service = new ApiService();
    }

    async getAll() {
        return await this.service.get('/discount');
    }

    async getQrCode(discountId) {
        return await this.service.get(`discount/code/${discountId}`);
    }

    async getSharedDiscounts() {
        return await this.service.get(`discount/shared`);
    }
}

export const verifyDiscount = async (discountId, discountCodeId) => {
    try {
        const { data } = await api.get(`discount/code/verify/${discountId}/${discountCodeId}`);

        return data;
    } catch (error) {
        throw Error(error);
    }
};
