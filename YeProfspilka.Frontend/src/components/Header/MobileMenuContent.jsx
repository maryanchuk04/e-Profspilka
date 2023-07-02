import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Button from '../../ui/Buttons/Button';
import PrimaryButton from '../../ui/Buttons/PrimaryButton';
import Avatar from '../Avatar';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../services/TokenService';

const MobileMenuContent = ({ setHeaderState, handleClose, user }) => {
	const navigate = useNavigate();
	const links = [
		{
			name: 'Події',
			link: '/events',
		},
		{
			name: 'Переваги',
			link: '/#advantages',
		},
		{
			name: 'Ми в соц мережах',
			link: '/#socials',
		},
		{
			name: 'Партнери',
			link: '/#partners',
		},
		{
			name: 'Типові питання',
			link: '/#questions',
		},
	];

	const handleNavigate = () => {
		navigate('/profile');
		handleClose();
	};

	const MenuItem = ({ item }) => {
		return (
			<Link
				onClick={handleClose}
				to={item.link}
				className='text-white border-b-2 mb-6 border-white flex justify-between items-center'
			>
				<p className='text-2xl'>{item.name}</p>
				<i className='fas fa-arrow-up rotate-45 text-2xl'></i>
			</Link>
		);
	};

	return (
		<div className='flex flex-col justify-between h-5/6'>
			<p className='text-white'>#меню</p>
			<ul>
				{links.map((link, index) => (
					<MenuItem key={index} item={link} />
				))}
			</ul>
			{Token.get() ? (
				<div
					onClick={() => handleNavigate()}
					className='flex items-center mb-12 border border-white rounded-standart px-2 py-2'
				>
					<p className='text-white'>{user.fullName}</p>
					<Avatar src={user.avatar} className='w-20 h-20' />
				</div>
			) : (
				<div>
					<Button className='bg-white border-0 mb-3' onClick={() => setHeaderState(1)}>
						Увійти
					</Button>
					<PrimaryButton
						className='border-white text-white border-2 mb-5'
						onClick={() => setHeaderState(1)}
					>
						Зареєструватись
					</PrimaryButton>
				</div>
			)}
		</div>
	);
};

export default MobileMenuContent;
