import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../Avatar'

const UserDetails = ({ user }) => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/profile");
	}

	return (
		<div onClick={handleNavigate} className='cursor-pointer flex h-20 rounded-standart border border-black items-center px-5'>
			<h2 className='mr-6'>{user.fullName}</h2>
			<Avatar src={user.avatar} />
		</div>
	)
}

export default UserDetails