import React from 'react';
import { useNavigate } from 'react-router-dom';
import Circles from '../../components/Circles';
import Container from '../../components/Container';
import PrimaryButton from '../../ui/Buttons/PrimaryButton';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container className='h-full'>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col justify-center items-center'>
                <Circles>
                    <h1 className='text-white font-extrabold text-[10rem]'>404</h1>
                </Circles>
                <div className='mt-12'>
                    <p className='text-center'>упс... щось пішло не так</p>
                    <PrimaryButton onClick={() => navigate('/')} className='mt-16'>
                        На головну
                    </PrimaryButton>
                </div>
            </div>
        </Container>
    );
};

export default NotFound;
