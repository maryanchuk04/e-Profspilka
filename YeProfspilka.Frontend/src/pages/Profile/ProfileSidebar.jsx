import React from 'react'
import Avatar from '../../components/Avatar';
import Field from './Field';
import UserStatus from './UserStatus';

const ProfileSidebar = ({ user }) => {
	const { pib, facultet, course, isVerificated, status, avatar } = user;

	return (
		<div className='w-1/3'>
			<UserStatus status={status} />
			<Avatar src={avatar} className='h-64 w-64' />
			<Field label="П.І.Б:" text={pib} />
			<Field label="Місце навчання:" text={facultet} />
			<Field label="Курс:" text={course} />
			<Field label="Статус:" text={isVerificated ? "Верифікований" : "НЕ Верифікований"} />
		</div>
	)
}

export default ProfileSidebar