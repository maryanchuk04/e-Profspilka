'use client';

import { signOut } from 'next-auth/react';

import Button from './Button';

export const LogoutButton = () => {
    const logout = () => {
        signOut();
    }

    return (
        <Button className='mb-3' onClick={logout}>
            Вийти з профілю
        </Button>
    );
};
