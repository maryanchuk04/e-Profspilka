import React from 'react'
import BarcodeGenerator from '../BarcodeGenerator';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/userSlice';

const DiscountCard = ({ discount, blocked = false, disabled = false }) => {
	const { email } = useSelector(selectUserData);
	const { name, codeWord } = discount;

	return (
		<div className={`relative rounded h-72 max-md:h-fit my-5 py-3 ${blocked ? "bg-[#C1C1C1]" : "bg-[#9AE19D]"}`}>
			<div className='w-3/4 mx-auto max-md:w-full'>
				<div className='w-full flex justify-center items-center '>
					<BarcodeGenerator value={`${email}-${codeWord}`} disabled={disabled} />
				</div>
				<p className='text-bold text-xl text-center mb-4'>{name}</p>
				<p className='text-center text-black/50 w-1/2 mx-auto max-md:hidden'>Щоб використати знижку проскануйте цей штрих код біля каси в клубі</p>
			</div>
			{disabled && <div className='w-full h-full absolute top-0 left-0 backdrop-blur-sm'></div>}
		</div>
	)
}

export default DiscountCard