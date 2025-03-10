import Link from 'next/link';

interface MenuItemProps {
    label: string;
    icon: string;
    isPrimary?: boolean;
    href: string;
}

const MenuItem = ({ label, icon, isPrimary, href }: MenuItemProps) => {
    if (isPrimary) {
        return (
            <Link href={href} className='absolute top-[-25px] left-1/2 -translate-x-1/2 bg-white w-24 h-24 rounded-full flex items-center justify-center z-20 shadow-2xl'>
                <span className='flex flex-col items-center text-primary'>
                    <i className={`fa-solid ${icon} text-2xl`}></i>
                    {label}
                </span>
            </Link>
        );
    }

    return (
        <Link href={href} className='flex flex-col items-center w-28 text-white text-sm mb-4'>
            <i className={`fa-solid ${icon} text-xl mb-1`}></i>
            {label}
        </Link>
    );
};

const menuItems: MenuItemProps[] = [
    { label: 'Дім', icon: 'fa-house', href: '/' },
    { label: 'Знижки', icon: 'fa-qrcode', isPrimary: true, href: '/my-discounts'  },
    { label: 'Події', icon: 'fa-newspaper', href: '/events'  },
];

export default function Menu() {
    return (
        <section className='fixed bottom-0 left-1/2 -translate-x-1/2 w-[96%] mb-2 z-10'>
            <div className='relative bg-gradient-to-r from-indigo-300 via-purple-500 to-indigo-500 h-20 rounded-3xl flex justify-between items-end px-4 shadow-xl'>

                {menuItems.map((item, idx) => (
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
