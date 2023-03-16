import React from 'react'

const Button = ({ children, className = "", ...custom }) => {
	return (
		<button
			className={`w-full h-12 bg-white text-black border border-black text-base font-regular rounded-standart xl:h-14 max-sm:text-sm ${className}`}
			{...custom}
		>
			{children}
		</button >
	)
}

export default Button