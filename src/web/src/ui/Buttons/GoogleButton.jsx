import React from 'react'
import { useDispatch } from 'react-redux'
import Svg from '../../components/Svg'
// import Button from './Button'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuthenticateThunk } from '../../features/userSlice'
import PrimaryButton from './PrimaryButton';

const GoogleButton = ({ className = '' }) => {
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        // eslint-disable-next-line camelcase
        onSuccess: ({ access_token }) => dispatch(googleAuthenticateThunk(access_token)),
        onError: () => {
            console.log('Login Failed');
        },
    });

    return (
        <PrimaryButton
            className={`flex items-center justify-center mt-2 hover:bg-primary/75 duration-150 relative z-10 ${className}`}
            onClick={() => login()}
        >
            <Svg name='google' className='h-6 w-6 mr-2' />
            <p className='text-base max-sm:text-sm'>chnu.edu.ua</p>
        </PrimaryButton>
    );
};

export default GoogleButton