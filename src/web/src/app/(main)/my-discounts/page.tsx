import { getUserDiscounts } from '@/apis/discount';
import { getServerCurrentUser } from '@/app/api/auth/auth-helpers';
import Container from '@/components/Container';
import DiscountCard from '@/components/discounts/DiscountCard';
import NotVerifiedBanner from '@/components/NotVerifiedBanner';
import { isUserVerified } from '@/models/role';

export default async function MyDiscounts() {
    const [discounts, user] = await Promise.all([getUserDiscounts(), getServerCurrentUser()]);

    const verifiedUser = isUserVerified(user!);

    return (
        <section>
            <Container>
                <p className='font-bold mb-3'>#ваші знижки</p>

                {verifiedUser ? (
                    discounts.map((discount) => <DiscountCard discount={discount} key={discount.id} />)
                ) : (
                    <NotVerifiedBanner />
                )}
            </Container>
        </section>
    );
}
