"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

import { useMediaQuery } from '@/hooks';
import { CurrentUser } from '@/models/user';

import Avatar from '../Avatar';

interface UserDetailsProps {
    user: CurrentUser;
}

const UserDetails = ({ user }: UserDetailsProps) => {
    const media = useMediaQuery(700);
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/profile');
    };

    return !media ? (
        <div
            onClick={handleNavigate}
            className='cursor-pointer  flex h-[70px] rounded-standard border max-w-xl: w-fit border-black items-center px-3'
        >
            <h2 className='mr-6 text-xl max-xl:text-2xl max-w-xl: text-right max-xl:w-fit'>{user.fullName}</h2>
            <Avatar src={user.picture} className='h-14 w-14' />
        </div>
    ) : (
        <div onClick={handleNavigate}>
            <Avatar src={user.picture} className='border border-black w-14 h-14' />
        </div>
    );
};

export default UserDetails;
