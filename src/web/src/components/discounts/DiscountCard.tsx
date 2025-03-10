import { Discount } from '@/models/discount';

import { SecureText } from '../SecureText';
import { Tag } from '../Tag';

interface DiscountCardProps {
    discount: Discount;
}

export default function DiscountCard({ discount }: DiscountCardProps) {
    return (
        <article className='bg-light-green rounded-md mb-3 px-2 py-1 h-fit'>
            <div className='mb-2 my-1'>
                <img className='w-32' alt='partner-logo' src='https://static.tildacdn.one/tild3333-6139-4037-b365-326433653431/Logo.svg' />

            </div>
            <h5 className='font-semibold mb-2'>{discount.name}</h5>
            {discount.withPromoCode && (
                <p className='flex justify-between items-center'>
                    <span className='font-light'>Промо код:</span><SecureText withCopy={true} text={discount.promoCode ?? ''} />
                </p>
            )}
            <p className='text-sm mt-2 mb-1'>Використання через:</p>
            <div className='flex flex-wrap gap-2'>
                {discount.withBarCode && <Tag label={'Штрих код'} />}
                {discount.withPromoCode && <Tag label={'Промокод код'} />}
                {discount.withQrCode && <Tag label={'QR код'} />}
            </div>
        </article>
    );
}
