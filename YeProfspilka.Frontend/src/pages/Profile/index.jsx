import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from '../../components/Container'
import { fetchUserThunk, selectUserData, selectUserLoading } from '../../features/userSlice'
import ProfileSidebar from './ProfileSidebar'
import DiscountsList from './DiscountsList'
import Loader from '../../components/Loader'
import { selectDiscounts } from '../../features/discountSlice'

const Profile = () => {
	const loading = useSelector(selectUserLoading);
	const user = useSelector(selectUserData);
	const discounts = useSelector(selectDiscounts);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user && !user.id) {
			dispatch(fetchUserThunk());
		}
	}, [user])

	return (
		loading ? <Loader className='h-[500px]' /> : (
			<Container>
				<p>#кабінет</p>
				<h1 className='my-4 mb-6'>Особистий кабінет</h1>
				<div className='flex gap-6'>
					<ProfileSidebar user={user} />
					<DiscountsList status={user.status} discounts={discounts} />
				</div>
			</Container>
		)
	)
}

export default Profile