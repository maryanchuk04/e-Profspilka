import React from 'react'

const TextField = ({
	className = "",
	placeholder,
	...custom
}) => {
	return (
		<input type="text"
			placeholder={placeholder}
			className={`border focus-visible:outline-black focus-visible:border-2 border-black w-full rounded-standart h-12 p-2 pl-4 md:h-14 placeholder:text-black/25 placeholder:font-ukraine ${className}`}
			{...custom}
		/>
	)
}

export default TextField