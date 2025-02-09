import { useEffect } from 'react';

import Container from '@/components/Container';
import { fetchAdvantages } from '@/lib/features/advantages.slice';
import { fetchDiscounts } from '@/lib/features/discount.slice';
import { fetchEvents } from '@/lib/features/events.slice';
import { fetchPartners } from '@/lib/features/partners.slice';
import { fetchQuestions } from '@/lib/features/questions.slice';
import { useAppDispatch } from '@/lib/store';

import Advantages from './components/Advantages';
import Events from './components/Events';
import Landing from './components/Landing';
import Mark from './components/Mark';
import Partners from './components/Partners';
import SharedDiscounts from './components/SharedDiscounts';
import Socials from './components/Socials';
import TypicalQuestions from './components/TypicalQuestions';

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
