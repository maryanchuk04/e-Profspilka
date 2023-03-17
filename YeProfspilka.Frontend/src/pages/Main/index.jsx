import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAdvantages } from '../../features/advantagesSlice'
import { fetchEvents } from '../../features/eventsSlice'
import Advantages from './Advantages'
import Events from './Events'
import Landing from './Landing'
import Socials from './Socials'

const Main = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchEvents());
		dispatch(fetchAdvantages());
	}, [])

	return (
		<div className='w-full'>
			<Landing />
			<Events />
			<Advantages />
			<Socials />
		</div>
	)
}

export default Main