'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface MenuItemProps {
    label: string;
    icon: string;
    isPrimary?: boolean;
    href: string;
}

const MenuItem = ({ label, icon, isPrimary, href }: MenuItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href + '/');

    const baseIconClass = `fa-solid ${icon}`;
    const iconOpacity = isActive ? 'opacity-100' : 'opacity-50';
    const textColor = isActive ? 'text-white font-semibold' : isPrimary ? 'text-primary' : 'text-white opacity-80';

    if (isPrimary) {
        return (
            <Link
                href={href}
                className={`absolute top-[-25px] left-1/2 -translate-x-1/2 bg-white w-24 h-24 rounded-full flex items-center justify-center z-20 shadow-2xl border-2 ${
                    isActive ? 'border-primary' : 'border-white'
                }`}
            >
            <span className={`flex flex-col items-center text-primary ${!isActive && '!text-primary !opacity-50'}`}>
                    <i className={`${baseIconClass} text-2xl ${iconOpacity}`}></i>
                    {label}
                </span>
            </Link>
        );
    }

    return (
        <Link
            href={href}
            className={`flex flex-col items-center w-28 text-sm mb-4 ${textColor}`}
        >
            <i className={`${baseIconClass} text-xl mb-1 ${iconOpacity}`}></i>
            {label}
        </Link>
    );
};

export default MenuItem;
