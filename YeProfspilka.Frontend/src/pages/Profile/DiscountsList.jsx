import React from 'react';
import DiscountCard from '../../components/DiscountCard';
import { MemberStatus } from '../../types/memberStatus';
import { useSelector } from 'react-redux';
import { selectDiscounts, selectDiscountsLoading } from '../../features/discountSlice';
import Loader from '../../components/Loader';
import { useMediaQuery } from 'react-responsive';
// import TextField from '../../ui/Fields/TextField';

const DiscountsList = ({ status }) => {
	const discounts = useSelector(selectDiscounts);
	const loading = useSelector(selectDiscountsLoading);
	const isMobile = useMediaQuery({ maxWidth: '450px' });

	const renderStatus = () => {
		const availableDiscounts = discounts.filter((x) => x.isOpen === true);
		const notAvailableDiscounts = discounts.filter((x) => x.isOpen === false);

		switch (status) {
			case MemberStatus.Student:
				return (
					<div>
						<h2>Персональні знижки</h2>
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
								{!isMobile && (
									<div className='absolute rounded-standart grid place-items-center top-0 z-30 backdrop-blur-sm h-full w-full'>
										<div className='bg-black w-1/2 p-4 text-center rounded-standart'>
											<p className='text-white'>НЕ має доступу</p>
											<p className='text-white/50'>
												Щоб відкрити доступ потрібно стати членом профспілки
											</p>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				);
			case MemberStatus.NotVerified:
				return (
					<div className='w-full h-full relative'>
						<div className=''>
							{discounts.map((item) => (
								<DiscountCard key={item.code} discount={item} disabled={true} />
							))}
						</div>
						<div className='absolute top-0 left-0  h-full w-full grid place-items-center'>
							<div className='bg-black h-20 grid place-items-center w-fit p-5 rounded-standart text-white'>
								<h2 className='text-center'>Ви не пройшли верифікацію!</h2>
							</div>
						</div>
					</div>
				);
			case MemberStatus.MemberProfspilka:
				return discounts.map((item) => <DiscountCard key={item} discount={item} />);
			default:
				return discounts.map((item) => <DiscountCard key={item.id} discount={item} />);
		}
	};

	return (
		<div className='w-full flex flex-col items-end'>
			{/* <div className='flex justify-end mb-4 w-80 max-md:w-full'>
				<TextField placeholder='Пошук...' onChange={handleChange} />
			</div> */}

			<div className='lg:bg-[#E6E6E6] max-md:py-0  max-md:px-0 px-12 max-md:w-full w-full py-8 rounded-standart max-h-[900px] overflow-y-auto xs:max-h-[300px] xl:max-h-[600px]'>
				{loading ? <Loader /> : <div>{renderStatus()}</div>}
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
