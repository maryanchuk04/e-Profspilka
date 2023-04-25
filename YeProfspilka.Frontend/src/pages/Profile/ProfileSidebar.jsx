import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/userSlice';
import Avatar from '../../components/Avatar';
import { MemberStatus } from '../../types/memberStatus';
import Field from './Field';
import UserStatus from './UserStatus';

const ProfileSidebar = () => {
	const user = useSelector(selectUserData);
	const { fullName, facultet, course, status, avatar, role } = user;

	useEffect(() => { console.log(user) })

	return (
		<div className='w-1/4 relative'>
			<div className='absolute right-0 top-0'>
				<UserStatus status={status} />
			</div>

			<Avatar src={avatar} className='h-64 w-64' />
			<Field label="П.І.Б:" text={fullName} />
			<Field label="Місце навчання:" text={facultet || "Невідомо"} />
			<Field label="Курс:" text={course || "Невідомо"} />
			<Field label="Статус:" text={role === MemberStatus.Student || role === MemberStatus.MemberProfspilka ? "Верифікований" : "НЕ Верифікований"} />
		</div>
	)
}

export default ProfileSidebar