import { getUserDiscounts } from '@/apis/discount';

import DiscountCard from './DiscountCard';

export default async function UserProfileDiscounts() {
    const discounts = await getUserDiscounts();

    return (
        <section>
            <h3>Ваші знижки 😉:</h3>
            <div>
                {discounts.map((discount) => (
                    <DiscountCard discount={discount} key={discount.id} />
                ))}
            </div>
        </section>
    );
}
