import Link from 'next/link';

import ResponsiveWrapper from '@/components/ResponsiveWrapper';
import Svg from '@/components/Svg';
import GoogleButton from '@/ui/Buttons/GoogleButton';

export default function LoginPage() {
    return (
        <div className='relative min-h-screen flex flex-col items-center justify-center px-4 bg-white overflow-hidden'>
            <ResponsiveWrapper showOn='desktop'>
                <header className='absolute max-w-[600px] w-full py-4 top-1 px-6 flex justify-between items-center bg-transparent text-2xl shadow-sm z-20'>
                    <Link href='/' className='text-xl font-bold text-primary hover:underline'>
                        єПрофспілка
                    </Link>

                    <nav className='flex gap-8  text-xl font-medium text-gray-700'>
                        <Link href='/' className='hover:text-primary transition'>
                            Головна
                        </Link>
                        <Link href='/events' className='hover:text-primary transition'>
                            Події
                        </Link>
                    </nav>
                </header>
            </ResponsiveWrapper>
            <div className='absolute w-72 h-72 bg-primary opacity-30 blur-[100px] rounded-full top-[-100px] left-[-100px] z-0 animate-pulse-slow'></div>
            <div className='absolute w-60 h-60 bg-purple-400 opacity-20 blur-[80px] rounded-full bottom-[-80px] right-[-80px] z-0 animate-pulse-slower'></div>
            <div className='absolute w-32 h-32 bg-pink-400 opacity-30 blur-[70px] rounded-full top-10 right-10 z-0 animate-ping'></div>

            <div className='relative z-10 w-full max-w-sm text-center'>
                <div className='mb-6 flex justify-center'>
                    <Svg name='logo' className='w-80 h-24' />
                </div>

                <h1 className='text-center text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 leading-tight'>
                    Увійти в особистий аккаунт
                    <br />
                    <span className='text-primary'>єПрофспілки</span>
                </h1>

                <div className='mt-8 mb-6 flex flex-col gap-4 items-center'>
                    <GoogleButton className='z-10 w-full shadow-lg transition-transform hover:scale-105 duration-200' />

                    <p className='mt-3 text-xs text-black/50 leading-relaxed'>
                        Авторизація здійснюється за допомогою корпоративного облікового запису. Натиснувши на кнопку
                        входу ви надаєте обмежений доступ до особистих даних.
                    </p>
                </div>
            </div>
        </div>
    );
}
