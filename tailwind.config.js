import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,css}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				moonstone: {
					50: '#e7f6f7',
					100: '#cfedef',
					200: '#9fdae0',
					300: '#6fc8d0',
					400: '#3fb5c1',
					500: '#0fa3b1',
					600: '#0c828e',
					700: '#09626a',
					800: '#064147',
					900: '#032123'
				},
				vanilla: {
					DEFAULT: '#eddea4',
					900: '#43380d',
					800: '#87711b',
					700: '#caa928',
					600: '#e0c762',
					500: '#eddea4',
					400: '#f1e5b7',
					300: '#f4ecc9',
					200: '#f8f2db',
					100: '#fbf9ed'
				},
				tangerine: {
					DEFAULT: '#f7a072',
					900: '#441b04',
					800: '#893508',
					700: '#cd500c',
					600: '#f3732f',
					500: '#f7a072',
					400: '#f8b48f',
					300: '#fac7ab',
					200: '#fcdac7',
					100: '#fdece3'
				}
			}
		}
	},
	plugins: []
};
