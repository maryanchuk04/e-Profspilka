/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
				standart: '10px',
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
			},
			animation: {
				ball: 'ball 3s ease-in-out infinite',
				'second-ball': 'second-ball 3s ease-in-out infinite',
			},
		},
	},
	plugins: [],
};
