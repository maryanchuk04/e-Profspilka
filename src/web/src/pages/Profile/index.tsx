import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/lib/store';

import Container from '../../components/Container';
import Loader from '../../components/Loader';
import { fetchUserThunk, selectUserData, selectUserLoading } from '../../lib/features/user.slice';
import DiscountsList from './DiscountsList';
import ProfileSidebar from './ProfileSidebar';

const Profile = () => {
    const loading = useSelector(selectUserLoading);
    const user = useSelector(selectUserData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && !user.id) {
            dispatch(fetchUserThunk());
        }
    }, [user]);

    return loading ? (
        <Loader className='h-[500px]' />
    ) : (
        <Container>
            <p>#кабінет</p>
            <h1 className='my-4 mb-6'>Особистий кабінет</h1>
            <div className='flex gap-6 max-lg:flex-col'>
                <ProfileSidebar user={user} />
                <DiscountsList status={user.role} />
            </div>
        </Container>
    );
};

export default Profile;
