import React, { useEffect, useState } from 'react';
import QrcodeGenerator from '../QrcodeGenerator';
import SimpleModal from '../SimpleModal';
import Button from '../../ui/Buttons/Button';
import Loader from '../Loader';
import Timer from './Timer';
import { DiscountService } from '../../services/DiscountService';

const service = new DiscountService();

const DiscountCard = ({ discount, blocked = false }) => {
	const { name, withBarCode, withQrCode } = discount;
	const [isOpen, setIsOpen] = React.useState(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={`relative rounded-standart  my-5 h-22 py-3 items-center ${
				blocked ? 'bg-[#C1C1C1]' : 'bg-[#9AE19D]'
			}`}
		>
			<div className='w-11/12 flex justify-between items-center mx-auto'>
				<div>
					<p className='text-bold text-lg flex justify-between mb-0 items-center'>
						{name}
					</p>
					<span className='text-black/60 max-sm:text-xs font-light'>
						{withQrCode && !withBarCode && 'Ця знижка доступна тільки по QR коду'}
						{withBarCode && !withQrCode && 'Ця знижка доступна тільки по Штрих коду'}
						{withBarCode &&
							withQrCode &&
							'Цю знижку можна сканувати буль яким способом'}
					</span>
				</div>

				<div className=' flex justify-between gap-2'>
					{!blocked && (
						<React.Fragment>
							{withQrCode && (
								<Button onClick={toggleModal} className='!h-12 !w-12 text-2xl px-3'>
									<i className='text-2xl fa-regular fa-qrcode'></i>
								</Button>
							)}
							{withBarCode && (
								<Button className='!h-12 !w-12 px-2'>
									<i className='text-2xl fa-solid fa-barcode-read'></i>
								</Button>
							)}
						</React.Fragment>
					)}
				</div>
				{isOpen && <DiscountCardModal discount={discount} close={toggleModal} />}
			</div>
			{}
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
		<SimpleModal className='w-[320px] !h-fit'>
			<div>
				<p>#знижка</p>
				<h2>{discount.name}</h2>
				<p className=' text-ellipsis overflow-hidden'>{discount.description}</p>
				<div className='my-8 w-full '>
					{loading ? (
						<div className='grid place-items-center min-h-[300px] h-fit'>
							<Loader />
						</div>
					) : (
						<div className='grid place-items-center h-fit'>
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
