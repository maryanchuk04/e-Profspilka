import './globals.css';

export const metadata = {
    title: 'єПрофспілка',
    description: 'Офіційний сайт профспілки студентів Чернівецького національного університету імені Юрія Федьковича',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='uk'>
            <head>
                <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1.0' />
                <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css' />
            </head>
            <body>{children}</body>
        </html>
    );
}
    