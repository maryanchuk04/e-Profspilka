import Container from '@/components/Container';
import AdvantagesSection from '@/components/main-page/AdvantagesSection';
import Events from '@/components/main-page/Events';
import Landing from '@/components/main-page/Landing';
import SharedDiscounts from '@/components/main-page/SharedDiscounts';
import Socials from '@/components/main-page/Socials';
import TypicalQuestions from '@/components/main-page/TypicalQuestions';

export default async function Home({ searchParams }: { searchParams: { discountId?: string } }) {
    const discountId = searchParams?.discountId;

    return (
        <div className='w-full'>
            <Container>
                <Landing />
                <Events/>
                <SharedDiscounts selectedDiscountId={discountId} />
            </Container>
            <AdvantagesSection />
            <Container>
                <Socials />
                <TypicalQuestions/>
            </Container>
        </div>
    );
}