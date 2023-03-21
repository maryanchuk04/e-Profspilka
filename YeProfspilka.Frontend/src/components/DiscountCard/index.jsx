import React from 'react'
import BarcodeGenerator from '../BarcodeGenerator';

const DiscountCard = ({ discount }) => {
	const { name, code, isBlocked } = discount;

	return (
		<div className={`rounded my-5 py-3 ${isBlocked ? "bg-[#C1C1C1]" : "bg-[#9AE19D]"}`}>
			<div className='w-3/4 mx-auto'>
				<div className='w-full flex justify-center items-center'>
					<BarcodeGenerator value={code} />
				</div>
				<p className='text-bold'>{name}</p>
				<p>Щоб використати знижку проскануйте цей штрих код біля каси в клубі</p>
			</div>
		</div>
	)
}

export default DiscountCard