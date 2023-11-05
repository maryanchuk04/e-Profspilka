import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Circles from '../Circles';
import Container from '../Container';

const Footer = () => {
	const media = useMediaQuery({ maxWidth: '768px' });

	return (
		<div className='bg-[#212121] pt-6 mt-12 h-fit'>
			<Container className='flex justify-between w-full max-sm:flex-col h-max'>
				<div>
					<img
						src='/images/logo-transparent-big.png'
						alt='Transparent logo'
						className='w-20 h-20'
					/>
				</div>
				<div className='flex flex-col text-white/75 max-sm:my-6'>
					<h2 className='mb-6 text-white'>Посилання</h2>
					<Link className='mb-5' to='/'>
						Головна
					</Link>
					<Link className='mb-5' to='/events'>
						Події
					</Link>
					<Link className='mb-5' to='/profile'>
						Особистий кабінет
					</Link>
				</div>
				<div className='flex flex-col text-white/75'>
					<h2 className='mb-6 text-white'>Контакти</h2>
					<a
						className='mb-5'
						href='https://goo.gl/maps/gpTMvQajC4KMmBPs9'
						target='_blank'
						rel='noreferrer'
					>
						<i className='fas fa-house mr-2'></i>58022, Україна, м. Чернівці,
						<br /> вул. Небесної сотні 4в.
					</a>
					<a className='mb-5' href='tel:+380372584857'>
						<i className='fas fa-phone mr-2'></i>+38 (0372) 509437
					</a>
					<a
						className='mb-5'
						href='mailto:prokfqvkndsa@gmail.com'
						target='_blank'
						rel='noreferrer'
					>
						<i className='fas fa-envelope mr-2'></i>
						studprofkom@chnu.edu.ua
					</a>
					<a
						className='mb-5'
						href='https://telegra.ph/Korisn%D1%96-stor%D1%96nki-ta-kanali-dlya-student%D1%96v-CHNU-10-09'
						target='_blank'
						rel='noreferrer'
					>
						<i className='fas fa-link mr-2'></i>Корисні посилання
					</a>
				</div>
				{!media && <Circles className='scale-50' />}
			</Container>
		</div>
	);
};

export default Footer;
