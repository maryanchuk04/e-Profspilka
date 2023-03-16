import React from 'react'

const Circles = () => {
	return (
		<div className='h-full w-full relative'>
			<div className='w-32 h-32 backdrop-blur-2xl absolute top-0 right-0 rounded-full animate-ball'></div>
			<div className='w-96 h-96 bg-primary rounded-full'></div>
			<div className='w-40 h-40 backdrop-blur-3xl absolute rounded-full -bottom-5 -left-5 animate-second-ball'></div>
		</div>
	)
}

export default Circles