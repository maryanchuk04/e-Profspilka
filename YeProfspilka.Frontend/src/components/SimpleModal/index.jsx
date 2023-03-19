import React from 'react'

const SimpleModal = ({ children, handleClose = null, className = "" }) => {
	const handleClick = () => {
		if (handleClose) {
			handleClose();
		}
	}

	return (
		<div onClick={handleClick} className='h-full z-50 w-full bg-black/25 fixed top-0 left-0 backdrop-blur-xs grid place-items-center'>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`w-5/6 bg-white shadow-sm h-3/4 rounded-standart sm:h-5/6 lg:w-1/3 xl:w-1/3 xl:h-2/3 ${className}`}
			>
				<div className='w-3/4 py-8 m-auto h-full'>
					{children}
				</div>
			</div >
		</div>
	)
}

export default SimpleModal