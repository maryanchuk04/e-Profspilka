import { getSharedDiscounts } from '@/apis/discount';
import LinkButton from '@/ui/Buttons/LinkButton';

import { DiscountInfoModal } from '../DiscountCard';

interface Discount {
    id: string;
    name: string;
    description?: string;
}

interface SharedDiscountsProps {
    selectedDiscountId?: string | null;
}

const fetchSharedDiscounts = async (): Promise<Discount[]> => {
    try {
        const res = await getSharedDiscounts();
        return res;
    } catch (error) {
        console.error('An error occurred while fetching shared discounts:', error);
        return [];
    }
};

export default async function SharedDiscounts({ selectedDiscountId }: SharedDiscountsProps) {
    const discounts = await fetchSharedDiscounts();

    return (
        <div className='my-16'>
            <h1>Знижки, які доступні всім студентам</h1>
            {discounts.map((discount) => (
                <DiscountComponent key={discount.id} discount={discount} isOpen={discount.id === selectedDiscountId} />
            ))}
        </div>
    );
};

interface DiscountProps {
    discount: Discount;
    isOpen: boolean;
}

const DiscountComponent: React.FC<DiscountProps> = ({ discount, isOpen }) => {
    return (
        <div className='p-3 my-2 bg-[#9AE19D] rounded-standard flex gap-2 items-center w-full'>
            <i className='fas fa-tags mx-3 max-sm:mx-1 text-4xl'></i>
            <div className='flex justify-between items-center w-full'>
                <h4>{discount.name}</h4>
                <LinkButton className='!h-12 !w-12 text-2xl px-3' href={`?discountId=${discount.id}`}>
                    <i className='text-2xl fas fa-info'></i>
                </LinkButton>
            </div>
            {isOpen && <DiscountInfoModal discount={discount} />}
        </div>
    );
};

