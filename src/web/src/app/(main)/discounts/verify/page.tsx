import Image from 'next/image';
import Link from 'next/link';

import { verifyDiscount } from '@/apis/discount';
import Container from '@/components/Container';
import PrimaryButton from '@/ui/Buttons/PrimaryButton';

interface Props {
    searchParams: any;
}

export default async function VerifyDiscountPage({ searchParams }: Props) {
    const { discountId, discountCode } = await searchParams;

    if (!discountId || !discountCode) {
        return (
            <Container className='min-h-[30rem] grid place-items-center text-center'>
                <h1 className='text-2xl font-bold mb-2'>Параметри не передані</h1>
                <p className='text-sm text-gray-600 mb-6'>discountId та discountCode є обовʼязковими</p>
                <Link href='/'>
                    <PrimaryButton className='!w-56'>На головну</PrimaryButton>
                </Link>
            </Container>
        );
    }

    let result;
    try {
        result = await verifyDiscount(discountId, discountCode);
    } catch (err: any) {
        return (
            <Container className='min-h-[30rem] grid place-items-center text-center'>
                <h1 className='text-2xl font-bold mb-2'>Помилка при перевірці</h1>
                <p className='text-sm text-gray-600 mb-6'>{err?.response?.data?.message || 'Невідома помилка'}</p>
                <Link href='/'>
                    <PrimaryButton className='!w-56'>На головну</PrimaryButton>
                </Link>
            </Container>
        );
    }

    return (
        <Container className='min-h-[30rem] grid place-items-center text-center'>
            <h1 className='text-2xl font-bold mb-4'>#Верифікація знижки</h1>

            {result?.isSuccess ? (
                <>
                    <h2 className='text-xl font-semibold text-green-700'>✅ QR-код успішно підтверджено!</h2>
                    <p className='text-black/60 mt-2'>
                        Знижка <span className='font-bold'>{result.discount?.name}</span> доступна для
                        <span className='font-bold ml-1'>{result.fullName}</span>
                    </p>
                    <Image src='/images/success.png' alt='success' width={128} height={128} className='my-10' />
                </>
            ) : (
                <>
                    <h2 className='text-xl font-semibold text-red-600'>❌ Цей QR-код вже не дійсний!</h2>
                    <p className='text-black/60 mt-2'>Не потрібно нас обманювати :)</p>
                    <Image src='/images/warning.png' alt='warning' width={128} height={128} className='my-10' />
                </>
            )}

            <Link href='/'>
                <PrimaryButton className='!w-56'>На головну</PrimaryButton>
            </Link>
        </Container>
    );
}
