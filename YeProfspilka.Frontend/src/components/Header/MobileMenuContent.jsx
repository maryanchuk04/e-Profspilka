import React from 'react'
import Button from '../../ui/Buttons/Button';
import PrimaryButton from '../../ui/Buttons/PrimaryButton';

const MobileMenuContent = ({ setHeaderState }) => {
	const links = ["Події", "Переваги", "Ми в соц мережах", "Партнери", "Типові питання"];

	const MenuItem = ({ item }) => {
		return (
			<li className='text-white border-b-2 mb-6 border-white flex justify-between items-center'>
				<p className='text-2xl'>{item}
				</p>
				<i className='fas fa-arrow-up rotate-45 text-2xl'></i>
			</li>
		);
	}

	return (
		<div className='flex flex-col justify-between h-5/6'>
			<p className='text-white'>#меню</p>
			<ul>
				{
					links.map((link, index) => (
						<MenuItem key={index} item={link} />
					))
				}
			</ul>
			<div>
				<Button className='bg-white border-0 mb-3' onClick={() => setHeaderState(1)}>Увійти</Button>
				<PrimaryButton className='border-white text-white border-2 mb-5' onClick={() => setHeaderState(1)}>Зареєструватись</PrimaryButton>
				<p className='text-white/50 text-center text-xs '>ПРОФСПІЛКОВА ОРГАНІЗАЦІЯ СТУДЕНТІВ
					ЧЕРНІВЕЦЬКОГО НАЦІОНАЛЬНОГО УНІВЕРСИТЕТУ
					ІМЕНІ ЮРІЯ ФЕДЬКОВИЧА
				</p>
			</div>
		</div>
	)
}

export default MobileMenuContent