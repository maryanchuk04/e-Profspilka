import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/userSlice';
import QrcodeGenerator from '../QrcodeGenerator';
import { useMediaQuery } from 'react-responsive';
import SimpleModal from '../SimpleModal';
import Button from '../../ui/Buttons/Button';
import Loader from '../Loader';
import Timer from './Timer';
import { DiscountService } from '../../services/DiscountService';

const service = new DiscountService();

const DiscountCard = ({ discount, blocked = false, disabled = false }) => {
	const { email } = useSelector(selectUserData);
	const { name, codeWord } = discount;
	const isMobile = useMediaQuery({ maxWidth: '450px' });
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleModal = () => {
		if (isMobile) {
			setIsOpen(!isOpen);
		}
	};

	return (
		<div
			className={`relative rounded h-72 max-md:h-fit my-5 py-3 ${
				blocked ? 'bg-[#C1C1C1]' : 'bg-[#9AE19D]'
			}`}
			onClick={toggleModal}
		>
			<div className='w-3/4 mx-auto max-md:w-full'>
				{!isMobile && (
					<div className='w-full flex justify-center items-center '>
						<QrcodeGenerator size={150} value={`${email}/${codeWord}`} />
					</div>
				)}
				<p className='text-bold text-xl text-center mb-4'>{name}</p>
				<p className='text-center text-black/50 w-1/2 mx-auto max-md:hidden'>
					Щоб використати знижку проскануйте цей штрих код біля каси в клубі
				</p>
			</div>
			{disabled && (
				<div className='w-full h-full absolute top-0 left-0 backdrop-blur-sm'></div>
			)}
			{isMobile && (
				<div className='w-9/12 mx-auto'>
					<Button>Використати</Button>
					{isOpen && <DiscountCardModal discount={discount} close={toggleModal} />}
				</div>
			)}
		</div>
	);
};

const DiscountCardModal = ({ discount, close }) => {
	const [loading, setLoading] = React.useState(true);
	const [isTimerStarted, setIsTimerStarted] = useState(true);
	const [qrCodeValue, setQrCodeValue] = useState('');

	useEffect(() => {
		loadDisount();
	}, []);

	const loadDisount = async () => {
		setLoading(true);

		const { data } = await service.getQrCode(discount.id);
		const url = `${window.location.origin}/${data.discount.id}/${data.code}`;

		setQrCodeValue(url);
		setLoading(false);
		setIsTimerStarted(true);
	};

	return (
		<SimpleModal className='w-[320px] h-fit'>
			<div>
				<p>#знижка</p>
				<h2>{discount.name}</h2>
				<p className=' text-ellipsis overflow-hidden'>{discount.description}</p>
				<div className='my-8 w-full '>
					{loading ? (
						<div className='grid place-items-center min-h-[300px]'>
							<Loader />
						</div>
					) : (
						<div className='grid place-items-center'>
							<div className='mb-3'>
								<QrcodeGenerator size={250} value={qrCodeValue} />
							</div>
							<Timer
								finishHandler={loadDisount}
								isTimerStarted={isTimerStarted}
								setIsTimerStarted={setIsTimerStarted}
							/>
						</div>
					)}
				</div>
				<Button className='bg-primary' onClick={close}>
					Готово
				</Button>
			</div>
		</SimpleModal>
	);
};

export default DiscountCard;
