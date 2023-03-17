import React from 'react'

const EventCard = ({ event }) => {
	const { id, title, date } = event;
	return (
		<div className='relative flex-1 flex flex-col justify-between max-w-xs w-80 p-5 border border-black rounded-standart h-80 duration-150 cursor-pointer hover:text-white hover:bg-primary hover:border-primary' key={id}>
			<h3 className='w-3/4'>{title}</h3>
			<p>{date}</p>
			<span className='absolute bottom-3 right-3 text-2xl'>&#8599;</span>
		</div>
	)
}

export default EventCard