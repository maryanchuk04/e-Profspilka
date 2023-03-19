import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Container from '../../components/Container'
import { fetchAdvantages } from '../../features/advantagesSlice'
import { fetchEvents } from '../../features/eventsSlice'
import { fetchPartners } from '../../features/partnersSlice'
import Advantages from './components/Advantages'
import Events from './components/Events'
import Landing from './components/Landing'
import Mark from './components/Mark'
import Partners from './components/Partners'
import Socials from './components/Socials'
import TypicalQuestions from './components/TypicalQuestions'

const Main = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchEvents());
		dispatch(fetchAdvantages());
		dispatch(fetchPartners());
	}, [])

	return (
		<div className='w-full'>
			<Container>
				<Landing />
				<Events />
			</Container>
			<Advantages />
			<Container>
				<Socials />
				<Partners />
				<Mark />
				<TypicalQuestions />
			</Container>
		</div>
	)
}

export default Main