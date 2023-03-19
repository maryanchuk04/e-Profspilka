import React from 'react'

const Circles = ({ className = "" }) => {
	return (
		<div className={`h-full relative scale-100 ${className} max-sm:scale-50`}>
			<div className='w-32 h-32 backdrop-blur-2xl absolute top-0 right-0 rounded-full animate-ball'></div>
			<div className='w-96 h-96 bg-primary rounded-full'></div>
			<div className='w-40 h-40 backdrop-blur-3xl absolute rounded-full -bottom-5 -left-5 animate-second-ball'></div>
		</div>
	)
}

export default Circles