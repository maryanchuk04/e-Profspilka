import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { fetchDiscounts, fetchSharedDiscounts } from '../../features/discount.slice';
import { fetchEvents } from '../../features/events.slice';
import { fetchPartners } from '../../features/partners.slice';
import { fetchQuestions } from '../../features/questions.slice';
import { fetchAdvantages } from '../../features/advantages.slice';
import Loader from '../Loader';
import { useNavigate, ScrollRestoration } from 'react-router-dom';

const PageWrapper = ({ element, withFooter = true }) => {
    const dispatch = useDispatch();
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
                <React.Fragment>
                    <Header />
                    {element}
                    {withFooter && <Footer />}
                    <ScrollRestoration />
                </React.Fragment>
            )}
        </div>
    );
};

export default PageWrapper;
