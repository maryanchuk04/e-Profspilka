import { getUserDiscounts } from '@/apis/discount';
import Container from '@/components/Container';
import DiscountCard from '@/components/discounts/DiscountCard';

export default async function MyDiscounts() {
    const discounts = await getUserDiscounts();

    return (
        <section>
            <Container>
                <p className='font-bold mb-3'>#ваші знижки</p>
                {discounts.map((discount) => (
                    <DiscountCard discount={discount} key={discount.id} />
                ))}
            </Container>
        </section>
    );
}
