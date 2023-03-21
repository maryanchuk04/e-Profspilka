import React from 'react'
import { useSelector } from 'react-redux'
import Container from '../../components/Container'
import { selectUserData } from '../../features/userSlice'
import ProfileSidebar from './ProfileSidebar'
import DiscountsList from './DiscountsList'

const Profile = () => {
	const user = useSelector(selectUserData);

	return (
		<Container>
			<p>#кабінет</p>
			
			<h1 className='my-4 mb-6'>Особистий кабінет</h1>
			<div className='flex gap-6 '>
				<ProfileSidebar user={user} />
				<DiscountsList discounts={user.discounts} />
			</div>
		</Container>
	)
}

export default Profile