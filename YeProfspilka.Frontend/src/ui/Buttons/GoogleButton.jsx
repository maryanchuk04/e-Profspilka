import React from 'react'
import { useDispatch } from 'react-redux'
import Svg from '../../components/Svg'
import Button from './Button'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuthenticateThunk } from '../../features/userSlice'

const GoogleButton = () => {
	const dispatch = useDispatch();

	const login = useGoogleLogin({
		// eslint-disable-next-line camelcase
		onSuccess: ({ access_token }) => dispatch(googleAuthenticateThunk(access_token)),
		onError: () => {
			console.log('Login Failed');
		}
	});

	return (
		<Button className='flex items-center justify-center mt-2' onClick={() => login()}>
			<Svg name="google" className='h-6 w-6 mr-2' />
			<p className='text-base max-sm:text-sm'>chnu.edu.ua</p>
		</Button>
	)
}

export default GoogleButton