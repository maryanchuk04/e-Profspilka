import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getServerCurrentUser } from '@/app/api/auth/auth-helpers';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import ProfileSidebar from '@/components/profile/ProfileSidebar';

export async function generateMetadata() {
    return {
        title: 'єПрофспілка - Профіль',
    };
}

export default async function Profile() {
    const currentUser = await getServerCurrentUser();

    if (!currentUser) redirect('/login');

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
