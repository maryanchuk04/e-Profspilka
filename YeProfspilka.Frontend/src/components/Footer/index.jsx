import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Circles from '../Circles'
import Container from '../Container'

const Footer = () => {
	const media = useMediaQuery({ maxWidth: "450px" });

	return (
		<div className='bg-[#212121] pt-16 pb-10 mt-12'>
			<Container className='flex justify-between w-full max-sm:flex-col'>
				<div>
					<img src="/images/logo-transparent-big.png" alt="Transparent logo" className='w-20 h-20' />
				</div>
				<div className='flex flex-col text-white/75 max-sm:my-6'>
					<h2 className='mb-6 text-white'>Посилання</h2>
					<Link className='mb-5' to='/'>Головна</Link>
					<Link className='mb-5' to='/events'>Події</Link>
					<Link className='mb-5' to='/profile'>Особистий кабінет</Link>
				</div>
				<div className='flex flex-col text-white/75'>
					<h2 className='mb-6 text-white'>Контакти</h2>
					<a className='mb-5' href="https://goo.gl/maps/gpTMvQajC4KMmBPs9">
						<i className='fas fa-house mr-2'></i>58022, Україна, м. Чернівці,<br /> вул. Небесної сотні 4в.</a>
					<a className='mb-5' href="tel:+380372584857"><i className='fas fa-phone mr-2'></i>+38 (0372) 509437</a>
					<a className='mb-5' href="mailto:prokfqvkndsa@gmail.com"><i className='fas fa-envelope mr-2'></i>studprofkom@chnu.edu.ua</a>
				</div>
				{!media && <Circles className='scale-75' />}
			</Container>
		</div>
	)
}

export default Footer