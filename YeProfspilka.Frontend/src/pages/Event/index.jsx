import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventService } from '../../services/EventService';
import Loader from '../../components/Loader';
import Container from '../../components/Container';

const Event = () => {
	const service = new EventService();
	const { id } = useParams();
	const [event, setEvent] = useState(null);

	useEffect(() => {
		(async () => {
			const { data } = await service.getEventById(id);
			console.log(data);
			setEvent(data);
		})()
	}, [])

	return (
		!event ? <Loader /> : (
			<Container className='min-h-[40vh]'>
				<h1 className='text-black/60 mb-4 uppercase'>#Новини та події</h1>
				<h2 className='w-1/2'>{event.title}</h2>
				<div className='grid grid-cols-3 gap-4 my-4  max-lg:grid-cols-2 max-sm:grid-cols-1'>
					{event.images.map((image) => (
						<div key={image} className='h-96'>
							<img src={image} className='object-cover w-full h-full' />
						</div>
					))}
				</div>
				<div className='leading-8' dangerouslySetInnerHTML={{ __html: event.description }}></div>
			</Container>
		)
	)
}

export default Event