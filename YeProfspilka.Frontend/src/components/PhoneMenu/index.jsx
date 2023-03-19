import React from 'react'
import Container from '../Container';

const PhoneMenu = () => {
	const links = ["Події", "Переваги", "Ми в соц мережах", "Партнери", "Типові питання"];
	return (
		<div className='bg-primary h-screen w-full fixed top-0 left-0 mt-20 z-40'>
			<Container>
				<p>#меню</p>
				{
					links.map((link, index) => (
						<MenuItem key={index} item={link} />
					))
				}
				<div>
					<p className='text-white/50'>ПРОФСПІЛКОВА ОРГАНІЗАЦІЯ СТУДЕНТІВ
						ЧЕРНІВЕЦЬКОГО НАЦІОНАЛЬНОГО УНІВЕРСИТЕТУ
						ІМЕНІ ЮРІЯ ФЕДЬКОВИЧА
					</p>
				</div>
			</Container>
		</div>
	)
}
const MenuItem = ({ item }) => {
	return (
		<li className='text-white border-b-2 border-white flex justify-between items-center'>
			{item}
			<i className='fas fa-arrow-up rotate-45'></i>
		</li>
	);
}
export default PhoneMenu