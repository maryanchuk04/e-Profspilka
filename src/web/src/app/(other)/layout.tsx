import Menu from '@/components/menu/MobileMenu';

export const metadata = {
    title: 'Вхід - єПрофспілка',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='relative min-h-screen'>
            {children}
            <Menu />
        </div>
    );
}
