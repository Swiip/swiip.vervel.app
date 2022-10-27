const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['IBM Plex Sans', ...fontFamily.sans],
			},
		},
	},
	plugins: [],
}
