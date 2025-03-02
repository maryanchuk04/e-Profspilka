'use client';

import { useState } from 'react';

import { useMediaQuery } from '@/hooks';
import { isUserVerified } from '@/models/role';
import { CurrentUser } from '@/models/user';

import Avatar from '../Avatar';
import { ProfileInfoFields } from './ProfileInfoFields';

export interface ProfileSidebarProps {
    currentUser: CurrentUser;
}

const ProfileSidebar = ({ currentUser }: ProfileSidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const isTablet = useMediaQuery(976);
    const verified = isUserVerified(currentUser);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    if (isTablet) {
        return (
            <div
                className={`${
                    verified ? 'bg-[#F1E5C4]' : 'bg-[#b2b2b2]'
                }  flex flex-col rounded-standard max-sm:p-2 p-4 pb-1`}
                onClick={handleOpen}
            >
                <div className='flex justify-between items-center mb-2'>
                    <Avatar
                        className='h-auto w-full mr-2 max-sm:max-w-[5rem] max-lg:max-w-[8rem]'
                        src={currentUser.picture}
                    />
                    <div className='w-3/4 relative'>
                        <p className='mt-3'>П.І.Б</p>
                        <h2 className='text-lg'>{currentUser.fullName}</h2>
                    </div>
                </div>
                <i
                    className={`text-xl text-center mt-2 ${
                        !isOpen ? 'fa-solid fa-circle-down' : 'fa-solid fa-circle-up'
                    } `}
                ></i>
                {isOpen && <ProfileInfoFields currentUser={currentUser} />}
            </div>
        );
    }

    return (
        <div className='w-1/4 relative'>
            <div className='flex justify-between'>
                <Avatar src={currentUser.picture} className='h-56 w-56' />
            </div>

            <ProfileInfoFields currentUser={currentUser} />
        </div>
    );
};

export default ProfileSidebar;
