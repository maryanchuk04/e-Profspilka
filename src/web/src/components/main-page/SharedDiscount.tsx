'use client'

import { Discount } from '@/models/discount';
import LinkButton from '@/ui/Buttons/LinkButton';

import { DiscountInfoModal } from '../discounts/DiscountInfoModal';

interface SharedDiscountProps {
    discount: Discount;
    isOpen: boolean;
}

export default function SharedDiscount({ discount, isOpen }: SharedDiscountProps) {
    return (
        <div className='p-3 my-2 bg-light-green rounded-standard flex gap-2 items-center w-full'>
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
}
