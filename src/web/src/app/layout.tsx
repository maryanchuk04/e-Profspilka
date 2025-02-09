import './globals.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ReduxProvider from '@/components/ReduxProvider';

export const metadata = {
    title: 'єПрофспілка',
    description: 'Офіційний сайт профспілки студентів ЧНУ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <ReduxProvider>
                    <Header />
                    <main className='min-h-screen flex flex-col justify-between'>{children}</main>
                    <Footer />
                </ReduxProvider>
            </body>
        </html>
    );
}
