import React from 'react'
import { useSelector } from 'react-redux'
import Container from '../../components/Container'
import { selectUserData } from '../../features/userSlice'
import ProfileSidebar from './ProfileSidebar'
import DiscountsList from './DiscountsList'
import { selectDiscounts } from '../../features/discountSlice'

const Profile = () => {
	const user = useSelector(selectUserData);
	const discounts = useSelector(selectDiscounts);

	return (
		<Container>
			<p>#кабінет</p>
			<h1 className='my-4 mb-6'>Особистий кабінет</h1>
			<div className='flex gap-6'>
				<ProfileSidebar user={user} />
				<DiscountsList status={user.status} discounts={discounts} />
			</div>
		</Container>
	)
}

export default Profile