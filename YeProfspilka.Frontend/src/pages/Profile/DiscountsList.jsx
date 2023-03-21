import React from 'react'
import DiscountCard from '../../components/DiscountCard'

const DiscountsList = ({ discounts }) => {
	return (
		<div className='bg-[#E6E6E6] px-12 py-8 w-full rounded-standart max-h-[1000px] overflow-y-auto'>
			<h2>Персональні знижки</h2>
			{
				discounts.map((item) => (
					<DiscountCard key={item.code} discount={item} />
				))
			}
		</div>
	)
}

export default DiscountsList