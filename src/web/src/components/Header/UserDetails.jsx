import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';
import { useMediaQuery } from 'react-responsive';

const UserDetails = ({ user }) => {
	const media = useMediaQuery({ maxWidth: '700px' });
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate('/profile');
	};

	return !media ? (
		<div
			onClick={handleNavigate}
			className='cursor-pointer  flex h-[70px] rounded-standart border max-w-xl: w-fit border-black items-center px-3'
		>
			<h2 className='mr-6 text-xl max-xl:text-2xl max-w-xl: text-right max-xl:w-fit'>
				{user.fullName}
			</h2>
			<Avatar src={user.avatar} className='h-14 w-14' />
		</div>
	) : (
		<div onClick={handleNavigate}>
			<Avatar src={user.avatar} className='border border-black w-14 h-14' />
		</div>
	);
};

export default UserDetails;
