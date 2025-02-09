"use client";

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import Container from '@/components/Container';
import { handleOpen } from '@/lib/features/login.slice';
import { selectUserData } from '@/lib/features/user.slice';
import PrimaryButton from '@/ui/Buttons/PrimaryButton';

import MobileHeader from './MobileHeader';
import UserDetails from './UserDetails';

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);
    const isMobile = useMediaQuery({ maxWidth: 450 });

    if (isMobile) return <MobileHeader />;

    return (
        <Container>
            <header className="flex items-center justify-between py-5">
                <Link href="/" className="w-20 h-20">
                    <img src="/images/logo-big.png" alt="profspilka-logo" className="w-full h-full" />
                </Link>
                {user.fullName ? (
                    <UserDetails user={user} />
                ) : (
                    <div className="flex items-center">
                        <PrimaryButton className="!w-56 px-5 mr-4 h-10" onClick={() => dispatch(handleOpen())}>
                            Увійти
                        </PrimaryButton>
                    </div>
                )}
            </header>
        </Container>
    );
}
