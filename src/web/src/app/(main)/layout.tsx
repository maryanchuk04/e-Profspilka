import '../globals.css';

import ApplicationProvider from '@/components/ApplicationProvider';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Menu from '@/components/menu/Menu';
import ResponsiveWrapper from '@/components/ResponsiveWrapper';

export const metadata = {
    title: 'єПрофспілка',
    description: 'Офіційний сайт профспілки студентів ЧНУ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ApplicationProvider>
            <main className='min-h-screen flex flex-col justify-between'>
                <Header />
                {children}
                <ResponsiveWrapper showOn='mobile'><Menu /></ResponsiveWrapper>
                <Footer />
            </main>
        </ApplicationProvider>
    );
}
