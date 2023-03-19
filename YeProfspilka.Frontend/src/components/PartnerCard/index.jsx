import React from 'react'

const PartnerCard = ({ partner }) => {
	const { title, text, link, image } = partner;

	return (
		<div className='mx-1'>
			<div className='w-full h-56'>
				<img src={image} alt={title} className='w-full h-full' />
			</div>
			<p>{text}</p>
			<a href={link} className='text-black/60'>{title}</a>
		</div>
	)
}

export default PartnerCard