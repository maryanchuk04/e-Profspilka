'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getUserDiscounts } from '@/apis/discount';
import AuthenticationForm from '@/components/AuthenticationForm';
import Container from '@/components/Container';
import SimpleModal from '@/components/SimpleModal';
import { useMediaQuery } from '@/hooks';
import { selectLoginState, setLoginState, toggleLoginState } from '@/lib/features/login.slice';
import { useAppDispatch } from '@/lib/store';
import { CurrentUser } from '@/models/user';
import PrimaryButton from '@/ui/Buttons/PrimaryButton';

import MobileMenu from './MobileMenu';
import UserDetails from './UserDetails';

export default function Header() {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const session = useSession();
    const open = useSelector(selectLoginState);
    const [user, setUser] = useState<CurrentUser | null>(null);

    const isMobile = useMediaQuery(768);

    const toggleLoginModal = () => {
        dispatch(toggleLoginState());
    };

    const fetchUserInfo = () => {
        try {
            const currentUser = session.data?.user as CurrentUser;
            setUser(currentUser);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        const loginState = searchParams?.get('loginState');
        if (loginState)
            dispatch(setLoginState(true));

        fetchUserInfo();
        getUserDiscounts();
    }, [session.data, searchParams]);

    if (isMobile) return <MobileMenu user={undefined} />;

    return (
        <Suspense fallback="Loading..">
            <Container>
                <header className='flex items-center justify-between py-5'>
                    <Link href='/' className='w-20 h-20'>
                        <img src='/images/logo-big.png' alt='profspilka-logo' className='w-full h-full' />
                    </Link>
                    {user ? (
                        <UserDetails user={user} />
                    ) : (
                        <PrimaryButton className='!w-56 px-5 h-10 max-md:hidden' onClick={toggleLoginModal}>
                            Увійти
                        </PrimaryButton>
                    )}
                </header>
            </Container>
            {open && (
                <SimpleModal className='!h-fit !w-[30rem]' handleClose={toggleLoginModal}>
                    <AuthenticationForm />
                </SimpleModal>
            )}
        </Suspense>
    );
}
