import Container from '@/components/Container';
import AdvantagesSection from '@/components/main-page/AdvantagesSection';
import Events from '@/components/main-page/Events';
import Landing from '@/components/main-page/Landing';
import Partners from '@/components/main-page/Partners';
import SharedDiscounts from '@/components/main-page/SharedDiscounts';
import Socials from '@/components/main-page/Socials';
import TypicalQuestions from '@/components/main-page/TypicalQuestions';

type PageParams = Promise<{ searchParams?: { discountId?: string } }>;

export default async function Home(props: { params: PageParams }) {
    const discountId = (await props.params).searchParams?.discountId;

    return (
        <div className="w-full">
            <Container>
                <Landing />
                <Events />
                <SharedDiscounts selectedDiscountId={discountId ?? null} />
            </Container>
            <AdvantagesSection />
            <Container>
                <Partners/>
                <Socials />
                <TypicalQuestions />
            </Container>
        </div>
    );
}