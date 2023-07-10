import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../../components/Container';
import { fetchUserThunk, selectUserData, selectUserLoading } from '../../features/userSlice';
import ProfileSidebar from './ProfileSidebar';
import DiscountsList from './DiscountsList';
import Loader from '../../components/Loader';

const Profile = () => {
	const loading = useSelector(selectUserLoading);
	const user = useSelector(selectUserData);
	const dispatch = useDispatch();

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
