import React from 'react'

const UserStatus = ({ status }) => {
	const defaultStyles = "rounded-standart font-bold border h-12 w-12 grid place-items-center";
	switch (status) {
		//студент
		case 0: return (
			<div className={`${defaultStyles} border-primary text-primary`}>
				С
			</div>
		)
		// Член профіспілки
		case 1: return (
			<div className={`${defaultStyles} border-primary text-primary`}>
				Ч
			</div>
		)
		// Не верифікований
		case 2: return (
			<div className={`${defaultStyles} border-red text-red`}>
				Н
			</div>
		)
	}
}

export default UserStatus