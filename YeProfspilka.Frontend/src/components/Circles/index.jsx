import React from 'react'

const Circles = ({ className = "", children }) => {
	return (
		<div className={`h-full scale-100 ${className} max-sm:scale-50`}>
			<div className='relative w-96 h-96 bg-primary rounded-full  flex justify-center items-center'>
				<div className='w-40 h-40 backdrop-blur-3xl absolute rounded-full -bottom-5 -left-5 animate-second-ball'></div>
				<div className='w-32 h-32 backdrop-blur-2xl absolute top-0 right-0 rounded-full animate-ball'></div>
				{children}
			</div>
		</div>
	)
}

export default Circles