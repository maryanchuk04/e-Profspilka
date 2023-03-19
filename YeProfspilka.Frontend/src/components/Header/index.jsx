import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleOpen } from '../../features/loginSlice';
import { selectIsAuthorized } from '../../features/userSlice'
import Button from '../../ui/Buttons/Button';
import PrimaryButton from '../../ui/Buttons/PrimaryButton';
import Container from '../Container';
import UserDetails from './UserDetails';
import { useMedia } from 'use-media';
import MobileHeader from './MobileHeader';

const Header = () => {
	const dispatch = useDispatch();
	const autorized = useSelector(selectIsAuthorized);
	const media = useMedia({ maxWidth: "450px" })

	return media ? (
		<MobileHeader />
	) : (
		<Container>
			<header className='flex items-center justify-between max-h-max py-5'>
				<div className='w-20 h-20'>
					<img src="/images/logo-big.png" alt="profspilka-logo" className='w-full h-full' />
				</div>
				{
					autorized ? (
						<UserDetails />
					) : (
						<div className='flex items-center'>
							<PrimaryButton className='px-5 mr-4 h-10' onClick={() => dispatch(handleOpen())}>Увійти</PrimaryButton>
							<Button className='px-5 h-10' onClick={() => dispatch(handleOpen())}>Зареєструватись</Button>
						</div>
					)
				}
			</header>

		</Container>
	)
}

export default Header