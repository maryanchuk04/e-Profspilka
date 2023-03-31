import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeAlert } from '../../features/alertSlice';
import { AlertType } from '../../types/alertTypes';
import SimpleModal from '../SimpleModal'

const Alert = ({ duration = 3000, type = AlertType.ERROR, text }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const timeout = setTimeout(() => {
			dispatch(closeAlert());
		}, duration);

		return () => clearTimeout(timeout);
	}, [])

	return (
		<SimpleModal className='xs:h-fit xl:h-fit md:h-fit p-6' handleClose={() => dispatch(closeAlert())}>
			<div className='w-full flex flex-col items-center'>
				<h1 className='text-center'>{type === AlertType.ERROR ? "От халепа" : "Успішно"}</h1>
				<div className='h-20 w-20 my-2'>
					<img src={type === AlertType.ERROR ? '/images/warning.png' : "/images/success.png"} alt="alert-type" className='w-full h-full' />
				</div>
				<p className='text-center'>{text}</p>
			</div>
		</SimpleModal>
	)
}

export default Alert