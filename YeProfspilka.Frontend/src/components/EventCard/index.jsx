import React from 'react'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
	const navigate = useNavigate();
	const smStyles = 'max-sm:max-w-sm max-sm:h-52 max-sm:mb-3';
	const { id, title, date } = event;
	return (
		<div onClick={() => navigate(`/events/${id}`)} className={`relative flex-1 flex flex-col justify-between max-w-xs  p-5 border border-black rounded-standart h-80 duration-150 cursor-pointer hover:text-white hover:bg-primary hover:border-primary ${smStyles}`} key={id}>
			<h3 className='w-3/4'>{title}</h3>
			<p>{format(new Date(date), 'dd.MM.yyyy')}</p>
			<span className='absolute bottom-3 right-3 text-2xl'>&#8599;</span>
		</div>
	)
}

export default EventCard