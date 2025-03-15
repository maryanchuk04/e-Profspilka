'use client';

import { getQrCode } from '@/apis/discount';
import { Discount, DiscountCode } from '@/models/discount';

import { DiscountModalBase } from './DiscountModalBase';

export default function OpenQrModalButton({ discount }: { discount: Discount }) {
    const fetchQrValue = async (): Promise<DiscountCode>  => {
        return await getQrCode(discount.id);
    };

    return <DiscountModalBase discount={discount} isQr fetchQrValue={fetchQrValue} />;
}
