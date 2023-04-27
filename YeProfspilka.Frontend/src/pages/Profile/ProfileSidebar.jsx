import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/userSlice';
import Avatar from '../../components/Avatar';
import { MemberStatus } from '../../types/memberStatus';
import Field from './Field';
import UserStatus from './UserStatus';
import { useMediaQuery } from 'react-responsive';

const ProfileSidebar = () => {
	const media = useMediaQuery({ maxWidth: "700px" });
	const user = useSelector(selectUserData);
	const { fullName, facultet, course, avatar, role } = user;

	useEffect(() => { console.log(user) })

	return (
		!media ? (
			<div className='w-1/4 relative'>
				<div className='absolute right-0 top-0'>
					<UserStatus status={role} />
				</div>

				<Avatar src={avatar} className='h-64 w-64' />
				<Field label="П.І.Б:" text={fullName} />
				<Field label="Місце навчання:" text={facultet || "Невідомо"} />
				<Field label="Курс:" text={course || "Невідомо"} />
				<Field label="Статус:" text={role === MemberStatus.Student || role === MemberStatus.MemberProfspilka ? "Верифікований" : "НЕ Верифікований"} />
			</div>
		) : (
			<div className='bg-[#F1E5C4] rounded-standart p-4'>
				<div className='flex justify-between items-center'>
					<Avatar className='w-20 h-20 mr-2' src={avatar} />
					<div className='w-3/4 relative'>
						<div className=' -top-2 right-2 absolute'>
							<UserStatus status={role} />
						</div>
						<p className='mt-3'>П.І.Б</p>
						<h1 className='text-xl'>{fullName}</h1>
					</div>
				</div>
				<Field label="Статус:" text={role === MemberStatus.Student || role === MemberStatus.MemberProfspilka ? "Верифікований" : "НЕ Верифікований"} />
			</div>
		)
	)
}

export default ProfileSidebar