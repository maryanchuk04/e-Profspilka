import React from 'react'
import Avatar from '../../components/Avatar';
import { MemberStatus } from '../../types/memberStatus';
import Field from './Field';
import UserStatus from './UserStatus';

const ProfileSidebar = ({ user }) => {
	const { fullName, facultet, course, status, avatar } = user;

	return (
		<div className='w-1/4 relative'>
			<div className='absolute right-0 top-0'>
				<UserStatus status={status} />
			</div>

			<Avatar src={avatar} className='h-64 w-64' />
			<Field label="П.І.Б:" text={fullName} />
			<Field label="Місце навчання:" text={facultet || "Невідомо"} />
			<Field label="Курс:" text={course || "Невідомо"} />
			<Field label="Статус:" text={status === MemberStatus.STUDENT || status === MemberStatus.MEMBER_PROFSPILKA ? "Верифікований" : "НЕ Верифікований"} />
		</div>
	)
}

export default ProfileSidebar