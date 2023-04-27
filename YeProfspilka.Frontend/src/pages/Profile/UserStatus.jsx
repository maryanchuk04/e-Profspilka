import React from 'react'

const UserStatus = ({ status, className = '' }) => {
	const defaultStyles = "relative rounded-standart font-bold border-2 h-12 w-12 grid place-items-center group/item";
	const helperStyles = "absolute invisible -top-10 max-xl:left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/item:visible text-center p-3 rounded-standart w-72 text-white bg-primary"
	switch (status) {
		//студент
		case 1: return (
			<div className={`${defaultStyles} border-primary text-primary  ${className}`}>
				С
				<div className={helperStyles}>
					<p className='text-sm'>
						Вас верифіковано як
						Студента
					</p>
				</div>
			</div>
		)
		// Член профіспілки
		case 2: return (
			<div className={`${defaultStyles} border-primary text-primary  ${className}`}>
				Ч
				<div className={helperStyles}>
					<p className='text-sm'>Вас верифіковано як
						Члена профспілки</p>
				</div>
			</div>
		)
		// Не верифікований
		case 0: return (
			<div className={`${defaultStyles} border-red-600 text-red-600  ${className}`}>
				Н
				<div className={`${helperStyles} bg-red-600`}>
					<p className='text-sm'>
						Вас НЕ верифіковано
					</p>
				</div>
			</div>
		)
	}
}

export default UserStatus