import React from 'react';
import DiscountCard from '../../components/DiscountCard';
import { MemberStatus } from '../../types/memberStatus';
import { useSelector } from 'react-redux';
import { selectDiscounts, selectDiscountsLoading } from '../../features/discountSlice';
import Loader from '../../components/Loader';
import { DiscountType } from '../../types/discountType';

const DiscountsList = ({ status }) => {
	const discounts = useSelector(selectDiscounts);
	const loading = useSelector(selectDiscountsLoading);

	const renderDiscounts = () => {
		switch (status) {
			case MemberStatus.Student:
				return (
					<div>
						{discounts
							.filter((x) => {
								return (
									x.discountType === DiscountType.AvailableForAll ||
									x.discountType === DiscountType.OneTimeForAll
								);
							})
							.map((item) => (
								<DiscountCard
									key={item.code}
									discount={item}
									blocked={false}
									disabled={false}
								/>
							))}
						{discounts
							.filter((x) => {
								return (
									x.discountType === DiscountType.AvailableForMemberOfProf ||
									x.discountType === DiscountType.OneTimeForMemberOfProf
								);
							})
							.map((item) => (
								<div key={item.code} className='relative'>
									<DiscountCard key={item.code} discount={item} blocked={true} />
								</div>
							))}
					</div>
				);
			case MemberStatus.NotVerified:
				return discounts.map((item) => (
					<DiscountCard key={item.code} discount={item} disabled={true} blocked={true} />
				));
			case MemberStatus.MemberProfspilka:
				return discounts.map((item) => <DiscountCard key={item} discount={item} />);
			default:
				return discounts.map((item) => <DiscountCard key={item.id} discount={item} />);
		}
	};

	return (
		<div className='w-full flex flex-col'>
			<h2 className='max-sm:mb-3'>#Персональні знижки</h2>
			{status === MemberStatus.NotVerified && (
				<div className='text-xs bg-red-400 text-white p-4 rounded-standart my-4 flex items-center'>
					<img src='/images/warning.png' alt='warning-icon' className='h-8 w-8 mr-2' />
					<p className='flex'>
						Для того щоб користуватись знижками вам потрібно верифікуватись!
					</p>
					<a
						className=' inline-block  text-primary underline ml-2'
						href='mailto:marianchuk.maksym@chnu.edu.ua'
					>
						Напишіть нам
					</a>
				</div>
			)}
			<div className='lg:bg-[#E6E6E6] max-md:py-0 mt-2 max-md:px-0 px-12 max-md:w-full w-full py-8 rounded-standart max-h-[900px] overflow-y-auto max-sm:max-h-[300px] xl:h-full'>
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
