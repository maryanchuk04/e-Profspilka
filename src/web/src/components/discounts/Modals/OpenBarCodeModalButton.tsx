'use client';

import { DiscountModalBase } from './DiscountModalBase';

export default function OpenBarCodeModalButton({ discount }: { discount: any }) {
    return <DiscountModalBase discount={discount} isQr={false} barCodeImage={discount.barCodeImage} />;
}
