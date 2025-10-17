import type { Config } from 'tailwindcss';
import ui from './ui.config'

const config = {
	darkMode: 'class',
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			// customizing breakpoints
			screens: ui.breakpoints,
			// colors
			colors: ui.colors,
			// ui component's transition duration
			transitionDuration: {
				// adding the ms coz requires in form like 300ms
				DEFAULT: ui.transitionDuration.toString()+'ms',
			},
		},
	},
	plugins: [],
} satisfies Config;

export default config;
