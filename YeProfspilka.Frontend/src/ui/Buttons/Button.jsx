import React from 'react'

const Button = ({ children, className = "", ...custom }) => {
	return (
		<button
			className={`w-full h-14 bg-black text-white text-xl font-regular rounded-standart xl:h-14 ${className}`}
			{...custom}
		>
			{children}
		</button >
	)
}

export default Button