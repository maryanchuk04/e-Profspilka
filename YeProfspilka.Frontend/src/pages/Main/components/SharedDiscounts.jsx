import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSharedDiscounts } from '../../../features/discountSlice';
import { DiscountInfoModal } from '../../../components/DiscountCard';
import Button from '../../../ui/Buttons/Button';

const SharedDiscounts = () => {
	const discounts = useSelector(selectSharedDiscounts);

	return (
		<div>
			<h1 className='my-10'>Знижки які доступні всім студентам</h1>
			{discounts.map((discount) => (
				<Discount key={discount.id} discount={discount} />
			))}
		</div>
	);
};

const Discount = ({ discount }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='p-3 bg-[#9AE19D] rounded-standart flex gap-2 items-center w-full'>
			<i className='fas fa-tags mx-3 max-sm:mx-1 text-4xl'></i>
			<div className='flex justify-between items-center w-full'>
				<h3>{discount?.name}</h3>
				<Button onClick={() => setIsOpen(true)} className='!h-12 !w-12 text-2xl px-3'>
					<i className='text-2xl fas fa-info'></i>
				</Button>
			</div>
			{isOpen && <DiscountInfoModal discount={discount} close={() => setIsOpen(false)} />}
		</div>
	);
};

export default SharedDiscounts;
