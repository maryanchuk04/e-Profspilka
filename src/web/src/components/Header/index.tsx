import Link from 'next/link';

import { getServerCurrentUser } from '@/app/api/auth/auth-helpers';
import Container from '@/components/Container';
import PrimaryButton from '@/ui/Buttons/PrimaryButton';

import UserDetails from './UserDetails';

export default async function Header() {
    const user = await getServerCurrentUser();

    return (
        <Container>
            <header className='flex items-center justify-between py-5'>
                <Link href='/' className='w-20 h-20'>
                    <img src='/images/logo-big.png' alt='profspilka-logo' className='w-full h-full' />
                </Link>
                {user ? (
                    <Link href='/profile'>
                        <UserDetails user={user} />
                    </Link>
                ) : (
                    <Link href='/login'>
                        <PrimaryButton className='!w-56 px-5 h-10'>Увійти</PrimaryButton>
                    </Link>
                )}
            </header>
        </Container>
    );
}
