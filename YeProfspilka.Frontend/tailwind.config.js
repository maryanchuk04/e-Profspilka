/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		screens: {
			xs: '319px',
			sm: '480px',
			md: '767px',
			lg: '976px',
			xl: '1440px',
		},
		extend: {
			borderRadius: {
				'standart': '10px'
			},
			backdropBlur: {
				'xs': '2px'
			},
			fontFamily: {
				ukraine: ["e-Ukraine"],
				"ukraine-logo": ["e-Ukraine-logo"]
			},
			backgroundImage: {
				'blue-gradient': "linear-gradient(#0026F3, #565DFF)"
			}
		},
	},
	plugins: [],
}
