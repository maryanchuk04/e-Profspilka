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
                    <main className='min-h-screen h-auto flex flex-col justify-between'>
                        <Header />
                        {children}
                        <Footer />
                    </main>
                </ReduxProvider>
            </body>
        </html>
    );
}
