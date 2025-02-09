import { useSelector } from 'react-redux';

import DiscountCard from '../../components/DiscountCard';
import Loader from '../../components/Loader';
import { selectDiscounts, selectDiscountsLoading } from '../../lib/features/discount.slice';
import { DiscountType } from '../../types/discountType';
import { MemberStatus } from '../../types/memberStatus';

const DiscountsList = ({ status }) => {
    const discounts = useSelector(selectDiscounts);
    const loading = useSelector(selectDiscountsLoading);

    const isAvailableDiscount = (discount) => {
        return (
            discount.discountType === DiscountType.AvailableForAll ||
            discount.discountType === DiscountType.OneTimeForAll
        );
    };

    const isMemberOfProfDiscount = (discount) => {
        return (
            discount.discountType === DiscountType.AvailableForMemberOfProf ||
            discount.discountType === DiscountType.OneTimeForMemberOfProf
        );
    };

    const renderDiscountCards = () => {
        if (status === MemberStatus.NotVerified) {
            return (
                <div className='text-xs bg-red-400 text-white p-4 rounded-standart my-4 flex items-center'>
                    <img src='/images/warning.png' alt='warning-icon' className='h-8 w-8 mr-2' />
                    <p className='flex'>Для того щоб користуватись знижками вам потрібно верифікуватись!</p>
                    <a className='inline-block text-primary underline ml-2' href='mailto:marianchuk.maksym@chnu.edu.ua'>
                        Напишіть нам
                    </a>
                </div>
            );
        }

        return discounts.map((item) => (
            <DiscountCard
                key={item.code}
                discount={item}
                blocked={status === MemberStatus.Student && !isAvailableDiscount(item)}
                // disabled={
                //     status === MemberStatus.Student ? isMemberOfProfDiscount(item) : status === MemberStatus.NotVerified
                // }
            />
        ));
    };

    return (
        <div className='w-full flex flex-col'>
            <h2 className='max-sm:mb-3'>#Персональні знижки</h2>
            <div className='lg:bg-[#E6E6E6] max-md:py-0 mt-2 max-md:px-0 px-12 max-md:w-full w-full py-8 rounded-standart max-h-[900px] overflow-y-auto max-sm:max-h-[300px] xl:h-full'>
                {loading ? <Loader /> : <div>{renderDiscountCards()}</div>}
                {!discounts.length && (
                    <div>
                        <h2>У вас ще немає знижок!</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscountsList;
