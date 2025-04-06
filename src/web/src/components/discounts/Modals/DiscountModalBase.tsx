'use client';

import { useEffect, useState } from 'react';

import QrcodeGenerator from '@/components/QrcodeGenerator';
import SimpleModal from '@/components/SimpleModal';
import { buildVerifyUri, DiscountCode } from '@/models/discount';
import Button from '@/ui/Buttons/Button';
import PrimaryButton from '@/ui/Buttons/PrimaryButton';

import Timer from './Timer';

interface Props {
    discount: any;
    isQr?: boolean;
    barCodeImage?: string;
    fetchQrValue?: () => Promise<DiscountCode>;
}

export const DiscountModalBase = ({ discount, isQr = true, barCodeImage, fetchQrValue }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(isQr);
    const [qrValue, setQrValue] = useState('');
    const [isTimerStarted, setIsTimerStarted] = useState(false);

    const toggleModal = () => setIsOpen((prev) => !prev);

    const fetchAndRestartTimer = async () => {
        if (!isQr || !fetchQrValue) return;

        setLoading(true);
        const discountCode = await fetchQrValue();
        const qr = buildVerifyUri(discountCode);
        setQrValue(qr ?? '');

        setLoading(false);
        setIsTimerStarted(true);
    };

    useEffect(() => {
        if (isOpen && isQr && fetchQrValue) {
            (async () => {
                await fetchAndRestartTimer();
            })();
        }
    }, [isOpen]);

    return (
        <>
            <PrimaryButton onClick={toggleModal}>{isQr ? 'Показати QR код' : 'Показати Штрихкод'}</PrimaryButton>

            {isOpen && (
                <SimpleModal className='w-[320px] !h-fit max-h-[80vh]'>
                    <div>
                        <p className='font-bold'>#знижка</p>
                        <h2>{discount.name}</h2>
                        <div className='my-4 text-sm text-gray-600'>{discount.description}</div>

                        <div className='my-6 grid place-items-center'>
                            {loading ? (
                                <p>Завантаження...</p>
                            ) : isQr ? (
                                <QrcodeGenerator value={qrValue} size={200} />
                            ) : (
                                <img src={barCodeImage} alt='barcode' className='h-40 w-auto' />
                            )}
                        </div>

                        {isQr && (
                            <Timer
                                finishHandler={async () => {
                                    await fetchAndRestartTimer();
                                }}
                                isTimerStarted={isTimerStarted}
                                setIsTimerStarted={setIsTimerStarted}
                            />
                        )}

                        <Button onClick={toggleModal} className='bg-gray-200 mt-4 px-4 py-2 rounded'>
                            Закрити
                        </Button>
                    </div>
                </SimpleModal>
            )}
        </>
    );
};
