import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/userSlice';
import Avatar from '../../components/Avatar';
import { MemberStatus } from '../../types/memberStatus';
import Field from './Field';
import UserStatus from './UserStatus';
import { useMediaQuery } from 'react-responsive';

const ProfileSidebar = () => {
	// max-w-lg
	const media = useMediaQuery({ maxWidth: '976px' });
	const user = useSelector(selectUserData);
	const { fullName, facultet, course, avatar, role } = user;
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	return !media ? (
		<div className='w-1/4 relative'>
			<div className='flex justify-between'>
				<Avatar src={avatar} className='h-56 w-56' />
				<div className=''>
					<UserStatus status={role} />
				</div>
			</div>

			<Field label='П.І.Б:' text={fullName} />
			<Field label='Місце навчання:' text={facultet || 'Невідомо'} />
			<Field label='Курс:' text={course || 'Невідомо'} />
			<Field
				label='Статус:'
				text={
					role === MemberStatus.Student ||
					role === MemberStatus.MemberProfspilka ||
					role === MemberStatus.Admin ||
					role === MemberStatus.Moderator
						? 'Верифікований'
						: 'НЕ Верифікований'
				}
			/>
		</div>
	) : (
		<div className='bg-[#F1E5C4] rounded-standart p-4' onClick={handleOpen}>
			<div className='flex justify-between items-center'>
				<Avatar
					className='h-auto w-full mr-2 max-sm:max-w-[5rem] max-lg:max-w-[8rem]'
					src={avatar}
				/>
				<div className='w-3/4 relative'>
					<div className=' -top-2 right-2 absolute'>
						<UserStatus status={role} />
					</div>
					<p className='mt-3'>П.І.Б</p>
					<h1 className='text-lg'>{fullName}</h1>
				</div>
			</div>
			{isOpen && (
				<div>
					<Field
						label='Статус:'
						text={
							role === MemberStatus.Student ||
							role === MemberStatus.MemberProfspilka ||
							role === MemberStatus.Admin ||
							role === MemberStatus.Moderator
								? 'Верифікований'
								: 'НЕ Верифікований'
						}
					/>
					<Field label='Місце навчання:' text={facultet || 'Невідомо'} />
					<Field label='Курс:' text={course || 'Невідомо'} />
				</div>
			)}
		</div>
	);
};

export default ProfileSidebar;
