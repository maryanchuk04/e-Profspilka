import React, { useState } from 'react'
import Hamburger from './Hamburger';
import PhoneMenu from '../PhoneMenu';
import Container from '../Container';

const MobileHeader = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	return (
		<header className={`relative flex flex-col py-5 ${menuOpen && "bg-primary"}`}>
			<Container>
				<div className='flex justify-between items-center relative'>
					<div className='w-20 h-20'>
						<img src="/images/logo-big.png" alt="profspilka-logo" className='w-full h-full' />
					</div>
					<Hamburger isOpen={menuOpen} setIsOpen={setMenuOpen} />
				</div>
			</Container>
			{menuOpen && <PhoneMenu />}
		</header>
	)
}

export default MobileHeader