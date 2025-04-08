import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { getDiscountById } from '@/apis/discount';
import Container from '@/components/Container';
import { SecureText } from '@/components/SecureText';
import { Tag } from '@/components/Tag';
import { ParamsType } from '@/lib/pageParams';

const OpenQrModalButton = dynamic(() => import('@/components/discounts/Modals/OpenQrModalButton'));
const OpenBarCodeModalButton = dynamic(() => import('@/components/discounts/Modals/OpenBarCodeModalButton'));

export default async function DiscountDetailsPage(props: { params: ParamsType }) {
    const { id } = await props.params;

    const discount = await getDiscountById(id);
    if (!discount) return notFound();

    return (
        <Container>
            <h1 className='text-xl font-bold mb-2'>{discount.name}</h1>
            {/* <div className='w-full flex justify-center mb-4'>
                <img
                    src={discount.}
                    alt='logo'
                    className='h-24 w-auto max-w-full object-contain'
                />
            </div> */}

            {discount.description && <p className='text-sm text-gray-700 mb-4'>{discount.description}</p>}

            <div className='flex flex-wrap gap-2 mb-4'>
                {discount.withQrCode && <Tag label='QR-код' icon='fa-qrcode' />}
                {discount.withBarCode && <Tag label='Штрих-код' icon='fa-barcode' />}
                {discount.withPromoCode && <Tag label='Промо-код' icon='fa-tag' />}
            </div>

            {discount.withPromoCode && (
                <div className='mb-4'>
                    <p>Промо код:</p>
                    <SecureText withCopy text={discount.promoCode ?? ''} />
                </div>
            )}
            <div className='flex gap-2'>
                <OpenQrModalButton discount={discount} />
                <OpenBarCodeModalButton discount={discount} />
            </div>


        </Container>
    );
}
