'use client';
import Image from 'next/image';
import { Spiral as Hamburger } from 'hamburger-react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import ui from '../../ui.config';

export default function Navbar({ sidebarCollapsed, setSidebarCollapsed, className }: { sidebarCollapsed: boolean; setSidebarCollapsed: (t: boolean) => void, className?:string }) {
	// HIDE SHOW NAV ON SCROLL
	const [hidden, setHidden] = useState(false);
	const [prev, setPrev] = useState(0);
	useMotionValueEvent(useScroll().scrollY, 'change', (latest: number) => {
		if (latest < prev) {
			setHidden(false);
		} else if (latest > 200 && latest > prev) {
			setHidden(true);
		}
		setPrev(latest);
	});

	return (
		<div
			className={`navbar sticky ${
				hidden ? '-translate-y-full' : ''
			} transition-all top-0 z-40 bg-[var(--bg)] px-2 py-1 border-solid border-b border-b-[var(--divider)] flex justify-between align-middle ${className}`}
		>
			<Image alt='Universe logo' src={ui.assets.icon} width='50' height='50' />

			<div className='right overflow-hidden'>
				<Hamburger toggled={!sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} size={20} duration={ui.transitionDuration/1000} rounded hideOutline/>
			</div>
		</div>
	);
}
