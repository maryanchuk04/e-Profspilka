import './globals.css';

import ApplicationProvider from '@/components/ApplicationProvider';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Menu from '@/components/menu/MobileMenu';

export const metadata = {
    title: 'єПрофспілка',
    description: 'Офіційний сайт профспілки студентів ЧНУ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='uk'>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0" />
                <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css' />
            </head>
            <body className='w-screen'>
                <ApplicationProvider>
                    <main className='min-h-screen flex flex-col justify-between'>
                        <Header/>
                        {children}
                        <Menu/>
                        <Footer />
                    </main>
                </ApplicationProvider>
            </body>
        </html>
    );
}
