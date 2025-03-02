'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUserData } from '../../lib/features/user.slice';
import AuthenticationForm from '../AuthenticationForm';
import Container from '../Container';
import Hamburger from './Hamburger';
import MobileMenuContent from './MobileMenuContent';

const MobileHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [headerState, setHeaderState] = useState(0);
    const user = useSelector(selectUserData);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setHeaderState(0);
        }
    }, [user]);

    const handleClick = () => {
        setMenuOpen(!menuOpen);
        setHeaderState(0);
    };

    const handleNavigate = () => {
        router.push('/');
        setMenuOpen(false);
    };

    const renderMobileHeaderContent = () => {
        switch (headerState) {
            case 0:
                return <MobileMenuContent setHeaderState={setHeaderState} handleClose={() => setMenuOpen(false)} user={user} />;
            case 1:
                return (
                    <div>
                        <p className='mb-16 text-white'>#реєстрація</p>
                        <AuthenticationForm className='bg-white p-3 rounded-standard' />
                    </div>
                );
        }
    };

    return (
        <header className={`flex w-full flex-col overflow-hidden py-4 ${menuOpen && 'bg-primary fixed top-0 z-30'}`}>
            <Container>
                <div className='flex justify-between items-center relative'>
                    <div className='w-20 h-20' onClick={handleNavigate}>
                        <img src='/images/logo-big.png' alt='profspilka-logo' className='w-full h-full' />
                    </div>
                    <Hamburger isOpen={menuOpen} setIsOpen={handleClick} />
                </div>
            </Container>
            {menuOpen && (
                <div className='bg-primary mt-24 h-full w-full fixed top-0 left-0 z-40'>
                    <Container className='h-full py-5 pb-12'>
                        {renderMobileHeaderContent()}
                        <p className='text-white/50 text-center text-xs'>
                            ПРОФСПІЛКОВА ОРГАНІЗАЦІЯ СТУДЕНТІВ ЧЕРНІВЕЦЬКОГО НАЦІОНАЛЬНОГО УНІВЕРСИТЕТУ ІМЕНІ ЮРІЯ ФЕДЬКОВИЧА
                        </p>
                    </Container>
                </div>
            )}
        </header>
    );
};

export default MobileHeader;
