import React from 'react'

const AdvantagesCard = ({ advantages }) => {
	const { tag, text } = advantages;

	return (
		<div className='flex-1-sm w-80 max-sm:w-full h-56 flex flex-col bg-black rounded-standart p-6 max-sm:w-sm'>
			<p className='text-white/50 text-xl'>#{tag}</p>
			<div className='mt-8'>
				<p className='text-white w-5/6'>{text}</p>
			</div>
		</div>
	)
}

export default AdvantagesCard