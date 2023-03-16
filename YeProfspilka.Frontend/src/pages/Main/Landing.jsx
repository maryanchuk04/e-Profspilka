import React from 'react'
import Circles from '../../components/Circles'
import Svg from '../../components/Svg'

const Landing = () => {
	return (
		<div className='flex justify-between h-96 w-full my-20'>
			<div className='flex flex-col justify-center h-full w-2/5'>
				<Svg name="logo" />
				<p>Дбаємо про кожного студента</p>
			</div>
			<div className='h-full'>
				<Circles />
			</div>
		</div>
	)
}

export default Landing