import React, { useState } from 'react';
import Hamburger from './Hamburger';
import Container from '../Container';
import MobileMenuContent from './MobileMenuContent';
import RegistrationForm from '../RegistrationForm';
import { selectUserData } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MobileHeader = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [headerState, setHeaderState] = useState(0);
	const user = useSelector(selectUserData);
	const navigate = useNavigate();

	const handleClick = () => {
		setMenuOpen(!menuOpen);
		setHeaderState(0);
	};

	const handleNavigate = () => {
		navigate('/');
		setMenuOpen(false);
	};

	const renderModileHeaderContent = () => {
		switch (headerState) {
			case 0: {
				return (
					<MobileMenuContent
						setHeaderState={setHeaderState}
						handleClose={() => setMenuOpen(false)}
						user={user}
					/>
				);
			}
			case 1: {
				return (
					<div>
						<p className='mb-16 text-white'>#реєстрація</p>
						<RegistrationForm className='bg-white p-3 rounded-standart' />
					</div>
				);
			}
		}
	};

	return (
		<header
			className={`flex w-full flex-col overflow-hiden py-4 ${
				menuOpen && 'bg-primary fixed top-0 z-30'
			}`}
		>
			<Container>
				<div className='flex justify-between items-center relative'>
					<div className='w-20 h-20' onClick={handleNavigate}>
						<img
							src='/images/logo-big.png'
							alt='profspilka-logo'
							className='w-full h-full'
						/>
					</div>
					<Hamburger isOpen={menuOpen} setIsOpen={handleClick} />
				</div>
			</Container>
			{menuOpen && (
				<div className='bg-primary mt-24 h-full w-full fixed top-0 left-0 z-40'>
					<Container className='h-full py-5'>
						{renderModileHeaderContent()}
						<p className='text-white/50 text-center text-xs '>
							ПРОФСПІЛКОВА ОРГАНІЗАЦІЯ СТУДЕНТІВ ЧЕРНІВЕЦЬКОГО НАЦІОНАЛЬНОГО
							УНІВЕРСИТЕТУ ІМЕНІ ЮРІЯ ФЕДЬКОВИЧА
						</p>
					</Container>
				</div>
			)}
		</header>
	);
};

export default MobileHeader;
