import Container from '@/components/Container';
import AdvantagesSection from '@/components/main-page/AdvantagesSection';
import Landing from '@/components/main-page/Landing';

export default function Home() {
    return (
        <div className='w-full'>
            <Container>
                <Landing />
                {/* <Events />
                <SharedDiscounts /> */}
            </Container>
            <AdvantagesSection />
            <Container>
                <></>
                {/* <Socials />
                <Partners />
                <Mark />
                <TypicalQuestions /> */}
            </Container>
        </div>
    );
}
