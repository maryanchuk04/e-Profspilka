import { Suspense } from 'react';

import Container from '@/components/Container';
import Loader from '@/components/Loader';
import AdvantagesSection from '@/components/main-page/AdvantagesSection';
import Events from '@/components/main-page/Events';
import Landing from '@/components/main-page/Landing';
import Partners from '@/components/main-page/Partners';
import SharedDiscounts from '@/components/main-page/SharedDiscounts';
import Socials from '@/components/main-page/Socials';
import TypicalQuestions from '@/components/main-page/TypicalQuestions';
import { SearchParamsProps } from '@/lib/pageParams';

export default async function Home({ searchParams }: SearchParamsProps) {
    const discountId = (await searchParams)?.discountId ?? (null as string | null);

    return (
        <div className='w-full'>
            <Suspense fallback={<Loader/>}>
                <Container>
                    <Landing />
                    <Events />
                    <SharedDiscounts selectedDiscountId={discountId} />
                </Container>
                <AdvantagesSection />
                <Container>
                    <Partners />
                    <Socials />
                    <TypicalQuestions />
                </Container>
            </Suspense>
        </div>
    );
}
