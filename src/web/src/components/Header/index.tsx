'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentUserInfo } from '@/apis/user';
import AuthenticationForm from '@/components/AuthenticationForm';
import Container from '@/components/Container';
import SimpleModal from '@/components/SimpleModal';
import { useMediaQuery } from '@/hooks';
import { handleOpen, selectLoginState } from '@/lib/features/login.slice';
import { useAppDispatch } from '@/lib/store';
import { User } from '@/models/user';
import PrimaryButton from '@/ui/Buttons/PrimaryButton';

import MobileMenu from './MobileMenu';

export default function Header() {
    const [user, setUser] = useState<User | null>(null);

    const isMobile = useMediaQuery(768);
    const dispatch = useAppDispatch();
    const session = useSession();

    const open = useSelector(selectLoginState);

    const toggleLoginModal = () => {
        dispatch(handleOpen());
    };

    const fetchUserInfo = async () => {
        // console.log(session);
        try {
            const user = await getCurrentUserInfo();
            setUser(user);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    if (isMobile) return <MobileMenu user={undefined} />;

    return (
        <>
            <Container>
                <header className='flex items-center justify-between py-5'>
                    <Link href='/' className='w-20 h-20'>
                        <img src='/images/logo-big.png' alt='profspilka-logo' className='w-full h-full' />
                    </Link>
                    {}
                    <PrimaryButton className='!w-56 px-5 h-10 max-md:hidden' onClick={toggleLoginModal}>
                        Увійти
                    </PrimaryButton>
                </header>
            </Container>
            {open && (
                <SimpleModal className='!h-fit !w-[30rem]' handleClose={toggleLoginModal}>
                    <AuthenticationForm />
                </SimpleModal>
            )}
        </>
    );
}
