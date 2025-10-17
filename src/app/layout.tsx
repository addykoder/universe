import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import ui from '../../ui.config';

const sans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

// Root Metadata
export const metadata: Metadata = {
	title: 'Universe',
	description: 'Where campus life connects seamlessly.',
	generator: 'Next.js',
	manifest: '/manifest.json',
	keywords: ['Attendance', 'Helper', 'Automation', 'management', 'software'],
	metadataBase: new URL(process.env.SITE_URL || ''),

	authors: [
		{ name: 'Aditya Tripathi' },
		{
			name: 'Aditya Tripathi',
			url: 'https://adityatripathi.com',
		},
	],
	icons: [
		{ rel: 'apple-touch-icon', url: 'icons/icon-192.png' },
		{ rel: 'icon', url: ui.assets.icon },
	],

	openGraph: {
		images: ui.assets.icon,
		type: 'website',
		siteName: 'Universe',
		title: 'Universe',
		url: process.env.SITE_URL,
		description: 'Simplify Attendance',
	},
};

// VIEWPORT
export const viewport: Viewport = {
	colorScheme: 'dark',
	themeColor: '#000000',
	width: 'device-width',
	initialScale: 1,
};

// ROOT LAYOUT
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`m-0 min-h-[100vh] ${sans.className}`}>{children}</body>
		</html>
	);
}
