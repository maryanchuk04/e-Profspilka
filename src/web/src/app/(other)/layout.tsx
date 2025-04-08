import Menu from '@/components/menu/Menu';
import ResponsiveWrapper from '@/components/ResponsiveWrapper';

export const metadata = {
    title: 'Вхід - єПрофспілка',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='relative min-h-screen'>
            {children}
            <ResponsiveWrapper showOn='mobile'>
                <Menu />
            </ResponsiveWrapper>
        </div>
    );
}
