'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Discount } from '@/models/discount';

import { SecureText } from '../SecureText';
import { Tag } from '../Tag';

interface DiscountCardProps {
    discount: Discount;
}

export default function DiscountCard({ discount }: DiscountCardProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <article
            className='relative bg-light-green rounded-xl mb-4 p-4 shadow-md transition-all duration-300 ease-in-out'
        >
            <div
                className='cursor-pointer flex justify-between items-center mb-2 hover:bg-light-green/60 px-2 py-1 rounded-md'
                onClick={() => setExpanded(!expanded)}
            >
                <div className='flex flex-col gap-1'>
                    <img
                        src={'https://static.tildacdn.one/tild3333-6139-4037-b365-326433653431/Logo.svg'}
                        alt='partner-logo'
                        className='w-fit max-w-80 h-10 object-cover'
                    />
                    <h5 className='font-bold text-md'>{discount.name}</h5>
                </div>

                <span className={`transition-transform duration-300 text-3xl ${expanded ? 'rotate-180' : 'rotate-0'}`}>
                    👇
                </span>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className='mt-2 px-1'>
                    <p className='text-sm text-gray-600'>{discount.description}</p>

                    {discount.withPromoCode && (
                        <div className='text-sm flex items-center justify-between mt-2'>
                            <span>Промо код:</span>
                            <SecureText text={discount.promoCode ?? ''} withCopy />
                        </div>
                    )}

                    <div className='mt-3 flex flex-wrap gap-2'>
                        {discount.withQrCode && <Tag label='QR' icon='fa-qrcode' />}
                        {discount.withBarCode && <Tag label='Штрих-код' icon='fa-barcode' />}
                        {discount.withPromoCode && <Tag label='Промо-код' icon='fa-tag' />}
                    </div>

                    <Link
                        href={`/discounts/${discount.id}`}
                        className='mt-4 block text-right text-sm text-primary underline'
                    >
                        Детальніше →
                    </Link>
                </div>
            </div>
        </article>
    );
}
