import { getServerCurrentUser } from '@/app/api/auth/auth-helpers';

import MenuItem, { MenuItemProps } from './MenuItem';

const menuItems: MenuItemProps[] = [
    { label: 'Головна', icon: 'fa-house', href: '/' },
    { label: 'Знижки', icon: 'fa-qrcode', isPrimary: true, href: '/my-discounts' },
    { label: 'Події', icon: 'fa-newspaper', href: '/events' },
];

const unauthenticatedMenuItems: MenuItemProps[] = [
    { label: 'Головна', icon: 'fa-house', href: '/' },
    { label: 'Увійти', icon: 'fa-right-to-bracket', isPrimary: true, href: '/login' },
    { label: 'Події', icon: 'fa-newspaper', href: '/events' },
];

export default async function Menu() {
    const user = await getServerCurrentUser();

    const isAuthorized = user != null;
    const menu = isAuthorized ? menuItems : unauthenticatedMenuItems;

    return (
        <section className='fixed bottom-0 left-1/2 -translate-x-1/2 w-[96%] mb-2 z-10'>
            <div className='relative bg-gradient-to-r from-indigo-300 via-purple-500 to-indigo-500 h-20 rounded-3xl flex justify-between items-end px-4 shadow-xl'>
                {menu.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        label={item.label}
                        icon={item.icon}
                        isPrimary={item.isPrimary}
                        href={item.href}
                    />
                ))}
            </div>
        </section>
    );
}
