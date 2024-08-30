import React from 'react';
import GoogleButton from '../../ui/Buttons/GoogleButton';

const RegistrationForm = ({ className = '' }) => {
    return (
        <div className={`my-3 w-full h-full flex flex-col justify-center ${className}`}>
            <h1 className='text-center w-full xs:text-xl sm:text-2xl md:text-3xl'>
                Увійти в особистий аккаунт
                <br /> єПрофспілки
            </h1>
            <div className='mt-6 mb-6 flex flex-col gap-4 relative'>
                <div>
                    <GoogleButton className='z-50' />
                    <p className='mt-4 font-normal text-xs text-center text-black/50'>
                        Авторизація здійснюється за допомогою корпоративного облікового запису
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
