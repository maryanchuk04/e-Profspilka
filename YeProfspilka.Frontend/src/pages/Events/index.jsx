import React from 'react'
// import { useSelector } from 'react-redux'
// import { selectEvents } from '../../features/eventsSlice'
import Container from '../../components/Container'

const Events = () => {
	const events = [];

	return (
		events.length === 0 ? (
			<div className='h-96 grid place-items-center'>
				<h1 className='text-center text-3xl max-sm:text-2xl'>
					На данний момент подій немає!
					Але вони будуть найблищим часом! <br />
					Приготуйтесь, буде цікаво!
				</h1>
			</div>
		) : (
			<Container>
				{/* TODO Events block */}
			</Container>
		)

	)
}

export default Events