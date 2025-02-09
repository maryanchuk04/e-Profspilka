"use client";

import { useRouter } from 'next/router';
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import { getAccessToken } from '@/apis/token';

import Button from '../../ui/Buttons/Button';
import Avatar from '../Avatar';

const MobileMenuContent = ({ setHeaderState, handleClose, user }) => {
    const router = useRouter();
    const links = [
        {
            name: 'Події',
            link: '/events',
        },
        {
            name: 'Переваги',
            link: '/#advantages',
        },
        {
            name: 'Ми в соц мережах',
            link: '/#socials',
        },
        {
            name: 'Партнери',
            link: '/#partners',
        },
        {
            name: 'Типові питання',
            link: '/#questions',
        },
    ];

    const handleNavigate = () => {
        router.push('/profile');
        handleClose();
    };

    const MenuItem = ({ item }) => {
        return (
            <Link
                onClick={handleClose}
                to={item.link}
                className='text-white border-b-2 mb-6 border-white flex justify-between items-center'
            >
                <p className='text-2xl'>{item.name}</p>
                <i className='fas fa-arrow-up rotate-45 text-2xl'></i>
            </Link>
        );
    };

    return (
        <div className='flex flex-col justify-between h-5/6'>
            <p className='text-white'>#меню</p>
            <ul>
                {links.map((link, index) => (
                    <MenuItem key={index} item={link} />
                ))}
            </ul>
            {getAccessToken() ? (
                <div
                    onClick={() => handleNavigate()}
                    className='flex items-center mb-12 border border-white rounded-standart px-2 py-2'
                >
                    <p className='text-white'>{user.fullName}</p>
                    <Avatar src={user.avatar} className='w-20 h-20' />
                </div>
            ) : (
                <div>
                    <Button className='bg-white border-0 mb-3' onClick={() => setHeaderState(1)}>
                        Увійти
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MobileMenuContent;
