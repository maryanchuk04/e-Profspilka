'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getAccessToken } from '@/apis/token';
import Container from '@/components/Container';
import Button from '@/ui/Buttons/Button';

import Hamburger from './Hamburger';

interface MobileMenuProps {
    user: any;
}

export default function MobileMenu({ user }: MobileMenuProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const links = [
        { name: 'Події', link: '/events' },
        { name: 'Переваги', link: '/#advantages' },
        { name: 'Соц мережі', link: '/#socials' },
        { name: 'Партнери', link: '/#partners' },
        { name: 'Питання', link: '/#questions' },
    ];

    return (
        <header className={`w-full ${menuOpen ? 'fixed bg-primary z-40 w-full top-0 left-0 h-full' : ''}`}>
            <Container>
                <div className='flex justify-between items-center py-4'>
                    <div className='w-20 h-20 cursor-pointer' onClick={() => router.push('/')}>
                        <img src='/images/logo-big.png' alt='profspilka-logo' className='w-full h-full' />
                    </div>

                    <Hamburger isOpen={menuOpen} setIsOpen={setMenuOpen} />
                </div>
            </Container>

            {menuOpen && (
                <Container className='text-white mt-10'>
                    <ul className='space-y-6'>
                        {links.map(({ name, link }) => (
                            <li key={link}>
                                <Link href={link} onClick={() => setMenuOpen(false)} className='text-2xl block'>
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {getAccessToken() ? (
                        <div onClick={() => router.push('/profile')} className='mt-10 flex items-center'>
                            <span className='mr-3'>{user.fullName}</span>
                            <img src={user.avatar} alt='User Avatar' className='h-14 w-14 rounded-full border' />
                        </div>
                    ) : (
                        <Button
                            className='mt-10 w-full text-lg bg-white text-black py-3'
                            onClick={() => setMenuOpen(false)}
                        >
                            Увійти
                        </Button>
                    )}
                </Container>
            )}
        </header>
    );
}
