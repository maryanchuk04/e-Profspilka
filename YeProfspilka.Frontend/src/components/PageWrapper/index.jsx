import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { useDispatch } from 'react-redux';
import { fetchDiscounts } from '../../features/discountSlice';
import { fetchEvents } from '../../features/eventsSlice';
import { fetchPartners } from '../../features/partnersSlice';
import { fetchQuestions } from '../../features/questionsSlice';
import { fetchAdvantages } from '../../features/advantagesSlice';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';

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
		])
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				navigate('/not-found');
			});
	}, []);

	return (
		<div className='h-full'>
			{loading ? (
				<div className='h-screen grid place-items-center'>
					<Loader />
				</div>
			) : (
				<React.Fragment>
					<Header />
					{element}
					{withFooter && <Footer />}
				</React.Fragment>
			)}
		</div>
	);
};

export default PageWrapper;
