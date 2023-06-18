import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleOpen } from '../../features/loginSlice';
import Button from '../../ui/Buttons/Button';
import PrimaryButton from '../../ui/Buttons/PrimaryButton';
import Container from '../Container';
import UserDetails from './UserDetails';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from './MobileHeader';
import { selectUserData } from '../../features/userSlice';
import { Link } from 'react-router-dom';

const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUserData);
	const isMobile = useMediaQuery({ maxWidth: '450px' });

	return isMobile ? (
		<MobileHeader />
	) : (
		<Container>
			<header className='flex items-center justify-between max-h-max py-5'>
				<Link to='/' className='w-20 h-20'>
					<img
						src='/images/logo-big.png'
						alt='profspilka-logo'
						className='w-full h-full'
					/>
				</Link>
				{user.fullName ? (
					<UserDetails user={user} />
				) : (
					<div className='flex items-center'>
						<PrimaryButton
							className='px-5 mr-4 h-10'
							onClick={() => {
								dispatch(handleOpen());
							}}
						>
							Увійти
						</PrimaryButton>
						<Button className='px-5 h-10' onClick={() => dispatch(handleOpen())}>
							Зареєструватись
						</Button>
					</div>
				)}
			</header>
		</Container>
	);
};

export default Header;
