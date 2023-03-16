import React from 'react'
import Avatar from '../Avatar'

const UserDetails = () => {
	const user = {
		fullName: "Миколко Микола",
		avatar: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSStEXQ52SE6txqvnwfAyOZ-dt6fkkBqzcir0RaZkoG54dYK7UByieR90Nb18ON4rdZ6VyDNVuQdk1kXik"
	}

	return (
		<div className='flex h-20 rounded-standart border border-black items-center px-5'>
			<h2 className='mr-6'>{user.fullName}</h2>
			<Avatar src={user.avatar} />
		</div>
	)
}

export default UserDetails