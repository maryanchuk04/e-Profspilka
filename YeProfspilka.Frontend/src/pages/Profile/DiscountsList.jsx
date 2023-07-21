import React from 'react';
import DiscountCard from '../../components/DiscountCard';
import { MemberStatus } from '../../types/memberStatus';
import { useSelector } from 'react-redux';
import { selectDiscounts, selectDiscountsLoading } from '../../features/discountSlice';
import Loader from '../../components/Loader';

const DiscountsList = ({ status }) => {
	const discounts = useSelector(selectDiscounts);
	const loading = useSelector(selectDiscountsLoading);

	const availableDiscounts = discounts.filter((x) => x.isOpen === true);
	const notAvailableDiscounts = discounts.filter((x) => x.isOpen === false);

	const renderDiscounts = () => {
		switch (status) {
			case MemberStatus.Student:
				return (
					<div>
						{availableDiscounts.map((item) => (
							<DiscountCard
								key={item.code}
								discount={item}
								blocked={false}
								disabled={false}
							/>
						))}
						{notAvailableDiscounts.map((item) => (
							<div key={item.code} className='relative'>
								<DiscountCard key={item.code} discount={item} blocked={true} />
							</div>
						))}
					</div>
				);
			case MemberStatus.NotVerified:
				return discounts.map((item) => (
					<DiscountCard key={item.code} discount={item} disabled={true} />
				));
			case MemberStatus.MemberProfspilka:
				return discounts.map((item) => <DiscountCard key={item} discount={item} />);
			default:
				return discounts.map((item) => <DiscountCard key={item.id} discount={item} />);
		}
	};

	return (
		<div className='w-full flex flex-col'>
			<h2 className='mb-6 max-sm:mb-3'>#Персональні знижки</h2>
			<div className='lg:bg-[#E6E6E6] max-md:py-0  max-md:px-0 px-12 max-md:w-full w-full py-8 rounded-standart max-h-[900px] overflow-y-auto xs:max-h-[300px] xl:max-h-[600px]'>
				{loading ? <Loader /> : <div>{renderDiscounts()}</div>}
				{!discounts && (
					<div>
						<h2>У вас ще немає знижок!</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default DiscountsList;
