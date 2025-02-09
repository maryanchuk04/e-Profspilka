import { useEffect, useState } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/lib/store';

import { fetchAdvantages } from '../../lib/features/advantages.slice';
import { fetchDiscounts, fetchSharedDiscounts } from '../../lib/features/discount.slice';
import { fetchEvents } from '../../lib/features/events.slice';
import { fetchPartners } from '../../lib/features/partners.slice';
import { fetchQuestions } from '../../lib/features/questions.slice';
import Footer from '../Footer';
import Header from '../Header';
import Loader from '../Loader';

const PageWrapper = ({ element, withFooter = true }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            dispatch(fetchDiscounts()),
            dispatch(fetchEvents()),
            dispatch(fetchAdvantages()),
            dispatch(fetchPartners()),
            dispatch(fetchQuestions()),
            dispatch(fetchSharedDiscounts()),
        ])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                navigate('/not-found');
            });
    }, []);

    return (
        <div className='min-h-screen flex flex-col justify-between'>
            {loading ? (
                <div className='h-screen grid place-items-center'>
                    <Loader />
                </div>
            ) : (
                <>
                    <Header />
                    {element}
                    {withFooter && <Footer />}
                    <ScrollRestoration />
                </>
            )}
        </div>
    );
};

export default PageWrapper;
