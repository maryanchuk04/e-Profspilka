import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeAlert } from '../../features/alertSlice';
import SimpleModal from '../SimpleModal'

const Alert = ({ duration = 3000, type = 'error', text }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(closeAlert());
		}, duration);

		return () => clearInterval(interval);
	}, [])

	return (
		<SimpleModal className='h-56' handleClose={() => dispatch(closeAlert())}>
			<div className='w-full flex flex-col items-center'>
				<h1 className='text-center'>{type === 'error' ? "От халепа" : "Успішно"}</h1>
				<div className='h-20 w-20 my-2'>
					<img src={type === 'error' ? '/images/warning.png' : "/images/success.png"} alt="alert-type" className='w-full h-full' />
				</div>
				<p className='text-center'>{text}</p>
			</div>
		</SimpleModal>
	)
}

export default Alert