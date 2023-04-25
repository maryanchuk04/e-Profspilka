import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventService } from '../../services/EventService';
import Loader from '../../components/Loader';

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
			<div>

			</div>
		)
	)
}

export default Event