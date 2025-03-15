/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            xxs: '300px',
            xs: '375px',
            sm: '480px',
            md: '767px',
            lg: '976px',
            xl: '1440px',
        },
        extend: {
            borderRadius: {
                standard: '10px',
            },
            backdropBlur: {
                xs: '2px',
            },
            fontFamily: {
                ukraine: ['e-Ukraine'],
                'ukraine-logo': ['e-Ukraine-logo'],
            },
            colors: {
                primary: '#0026F3',
                'light-green': '#9AE19D'
            },
            keyframes: {
                ball: {
                    '0%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-35px)',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                    },
                },
                'second-ball': {
                    '0%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(35px)',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                    },
                },
                pulseBounce: {
                    '0%, 100%': { transform: 'translateY(0) scale(1)' },
                    '50%': { transform: 'translateY(-8px) scale(1.05)' }
                }
            },
            animation: {
                pulseBounce: 'pulseBounce 1.5s ease-in-out infinite',
                ball: 'ball 3s ease-in-out infinite',
                'second-ball': 'second-ball 3s ease-in-out infinite',
                'pulse-slow': 'pulse 6s ease-in-out infinite',
                'pulse-slower': 'pulse 10s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
