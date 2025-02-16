'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';

import AuthenticationForm from '@/components/AuthenticationForm';
import Container from '@/components/Container';
import SimpleModal from '@/components/SimpleModal';
import { useMediaQuery } from '@/hooks';
import { handleOpen, selectLoginState } from '@/lib/features/login.slice';
import { useAppDispatch } from '@/lib/store';
import PrimaryButton from '@/ui/Buttons/PrimaryButton';

import MobileMenu from './MobileMenu';

export default function Header() {
    const dispatch = useAppDispatch();

    const open = useSelector(selectLoginState);
    const isMobile = useMediaQuery(768);

    const toggleLoginModal = () => {
        dispatch(handleOpen());
    };

    if (isMobile) return <MobileMenu user={undefined} />;

    return (
        <>
            <Container>
                <header className='flex items-center justify-between py-5'>
                    <Link href='/' className='w-20 h-20'>
                        <img src='/images/logo-big.png' alt='profspilka-logo' className='w-full h-full' />
                    </Link>

                    <PrimaryButton className='!w-56 px-5 h-10' onClick={toggleLoginModal}>
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
