import React from 'react'

const Field = ({ label, text }) => {
	return (
		<div className='flex flex-col w-full my-6'>
			<p className='text-black/30 mb-2'>{label}</p>
			<h2>{text}</h2>
		</div>
	)
}

export default Field