import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import Container from '@/components/Container';
import Loader from '@/components/Loader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';

import { getServerCurrentUser } from '../api/auth/auth-helpers';

export async function generateMetadata() {
    return {
        title: 'єПрофспілка - Профіль',
    };
}

export default async function Profile() {
    const currentUser = await getServerCurrentUser();

    if (!currentUser) redirect('/?loginState=true');

    return (
        <Container>
            <p className='font-bold'>#кабінет</p>
            <h1 className='my-4 mb-6'>Особистий кабінет</h1>
            <div className='flex gap-6 max-lg:flex-col'>
                <Suspense fallback={<Loader/>}>
                    <ProfileSidebar currentUser={currentUser} />
                    {/* <UserProfileDiscounts/> */}
                </Suspense>
            </div>
        </Container>
    );
}
