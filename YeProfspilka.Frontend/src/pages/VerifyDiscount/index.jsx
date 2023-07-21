import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verifyDiscount } from '../../services/DiscountService';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import PrimaryButton from '../../ui/Buttons/PrimaryButton';

const VerifyDiscount = () => {
    const { discountId, discountCodeId } = useParams();

    // DATA: {"fullName":null,"email":null,"image":null,"discount":null,"isSuccess":false}
    // if isSuccess == true then all data must be not null
    const [state, setState] = useState({ loading: false, data: null, error: null });

    useEffect(() => {
        (async () => {
            setState({ ...state, loading: true });
            try {
                const data = await verifyDiscount(discountId, discountCodeId);
                console.log(data);
                setState({ ...state, loading: false, data });
            } catch (error) {
                setState({ ...state, loading: false, error: error.response.data.message });
            }
        })();
    }, [discountId, discountCodeId]);

    return (
        <Container className='min-h-[30rem]'>
            <div className=''>
                <h1>#Верифікація знижки</h1>
                {state.loading ? (
                    <div className='h-80'>
                        <Loader />
                    </div>
                ) : state.data || !state.error ? (
                    <React.Fragment>
                        {state.data?.isSuccess ? (
                            <div className='mt-4 grid place-items-center'>
                                <h2>QR-код успішно підтверджено!</h2>
                                <p className='text-black/60 mt-2'>
                                    Знижка<span className='font-bold mx-1'>{state.data?.discount?.name}</span> доступна для
                                    <span className='font-bold ml-1'>{state.data?.fullName}</span>
                                </p>
                                <img src='/images/success.png' alt='success' className='w-32 h-32 my-10' />
                                <PrimaryButton className='!w-56'>На головну</PrimaryButton>
                            </div>
                        ) : (
                            <div className='mt-4 grid place-items-center'>
                                <h2>Цей QR-код вже не дійсний!</h2>
                                <p className='text-black/60 mt-2'>Не потрібно нас обманювати:)</p>
                                <img src='/images/warning.png' alt='warning' className='w-32 h-32 my-10' />
                                <PrimaryButton className='!w-56'>На головну</PrimaryButton>
                            </div>
                        )}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h1>Щось пішло не так!</h1>
                    </React.Fragment>
                )}
            </div>
        </Container>
    );
};

export default VerifyDiscount;
