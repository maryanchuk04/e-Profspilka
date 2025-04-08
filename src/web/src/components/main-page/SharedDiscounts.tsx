import { getSharedDiscounts } from '@/apis/discount';

import SharedDiscount from './SharedDiscount';

interface SharedDiscountsProps {
    selectedDiscountId?: string | null;
}

export default async function SharedDiscounts({ selectedDiscountId }: SharedDiscountsProps) {
    const discounts = await getSharedDiscounts();

    return (
        <div className='my-16'>
            <h1>Знижки, які доступні всім студентам</h1>
            {discounts.map((discount) => (
                <SharedDiscount key={discount.id} discount={discount} isOpen={discount.id === selectedDiscountId} />
            ))}
        </div>
    );
}
