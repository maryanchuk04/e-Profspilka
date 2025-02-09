import { useEffect } from 'react';

import Container from '@/components/Container';
import { fetchAdvantages } from '@/lib/features/advantages.slice';
import { fetchDiscounts } from '@/lib/features/discount.slice';
import { fetchEvents } from '@/lib/features/events.slice';
import { fetchPartners } from '@/lib/features/partners.slice';
import { fetchQuestions } from '@/lib/features/questions.slice';
import { useAppDispatch } from '@/lib/store';

import Advantages from '../../components/main-page/AdvantagesSection';
import Events from '../../components/main-page/Events';
import Landing from '../../components/main-page/Landing';
import Mark from '../../components/main-page/Mark';
import Partners from '../../components/main-page/Partners';
import SharedDiscounts from '../../components/main-page/SharedDiscounts';
import Socials from '../../components/main-page/Socials';
import TypicalQuestions from '../../components/main-page/TypicalQuestions';

const Main = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchDiscounts());
        dispatch(fetchEvents());
        dispatch(fetchAdvantages());
        dispatch(fetchPartners());
        dispatch(fetchQuestions());
    }, []);

    return (
        <div className='w-full'>
            <Container>
                <Landing />
                <Events />
                <SharedDiscounts />
            </Container>
            <Advantages />
            <Container>
                <Socials />
                <Partners />
                <Mark />
                <TypicalQuestions />
            </Container>
        </div>
    );
};

export default Main;
