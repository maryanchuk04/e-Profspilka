'use client';

import { signIn } from 'next-auth/react';

import Svg from '../../components/Svg';
import PrimaryButton from './PrimaryButton';

interface GoogleButtonProps {
    className?: string;
}

const GoogleButton = ({ className = '' }: GoogleButtonProps) => {

    const googleSignIn = async () => {
        await signIn("google");
    }

    return (
        <PrimaryButton
            className={`flex items-center justify-center mt-2 hover:bg-primary/75 duration-150 relative z-10 ${className}`}
            onClick={googleSignIn}
        >
            <Svg name='google' className='h-6 w-6 mr-2' />
            <p className='text-base max-sm:text-sm'>Увійти - chnu.edu.ua</p>
        </PrimaryButton>
    );
};

export default GoogleButton;
