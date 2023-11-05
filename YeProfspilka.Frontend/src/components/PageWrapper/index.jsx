import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { fetchDiscounts, fetchSharedDiscounts } from '../../features/discountSlice';
import { fetchEvents } from '../../features/eventsSlice';
import { fetchPartners } from '../../features/partnersSlice';
import { fetchQuestions } from '../../features/questionsSlice';
import { fetchAdvantages } from '../../features/advantagesSlice';
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
