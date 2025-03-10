'use client'

import { useMediaQuery } from '@/hooks';

import Header from '../Header';
import Menu from './MobileMenu';

export default function ApplicationMenu() {
    const isMobile = useMediaQuery(769)

    if (isMobile)
        return <Menu/>

    else return <Header/>
}