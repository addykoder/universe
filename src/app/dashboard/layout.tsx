'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import Loader from '@/components/Loader';
import useDisableScroll from '@/hooks/useDisableScroll';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
	const [animationLoaded, setAnimationLoaded] = useState(true);

	// disable scroll when either of these is false
	useDisableScroll(sidebarCollapsed, animationLoaded);

	return (
		<>
			{/* Before and after loading actions */}
			<Loader onLoad={() => setAnimationLoaded(true)} onStart={() => setAnimationLoaded(false)} />

			<div className='flex flex-col h-full'>
				{/* NAVBAR */}
				<Navbar className='lg:hidden' sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

				<div className='bottom flex flex-1'>
					{/* SIDEBAR */}
					<Sidebar sidebarCollapsed={sidebarCollapsed} />

					{/* CONTENT */}
					<div onClick={() => setSidebarCollapsed(true)} className={`${sidebarCollapsed ? '' : 'opacity-15'} content transition-all flex-1 bg-[var(--bg)]`}>
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
