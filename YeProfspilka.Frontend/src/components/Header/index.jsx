import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleOpen } from '../../features/loginSlice';
import { selectIsAuthorized } from '../../features/userSlice'
import Button from '../../ui/Buttons/Button';
import PrimaryButton from '../../ui/Buttons/PrimaryButton';
import UserDetails from './UserDetails';

const Header = () => {
	const dispatch = useDispatch();
	const autorized = useSelector(selectIsAuthorized);

	return (
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
	)
}

export default Header