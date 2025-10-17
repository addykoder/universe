'use client';
import Image from 'next/image';
import ui from '../../ui.config';
import Login from './Login';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
	const { user, loading, logout } = useAuth();
	console.log(loading);
	console.log(user);

	return (
		<div
			className={`sidebar transition-all top-0 bottom-0 left-0  border-r-[var(--divider)] border-r-solid border-r z-50 bg-[var(--bg)] w-[19rem] fixed lg:sticky lg:h-[100vh] ${
				sidebarCollapsed && '-translate-x-full lg:translate-x-0'
			} overflow-auto`}
		>
			<header className='bg-[var(--bg)] px-2 pt-2 pb-1 sticky top-0'>
				<div className='top flex items-center justify-between'>
					<Image alt='Universe' src={ui.assets.icon} width='50' height='50' />
				</div>

				<div className='border-b border-solid border-[var(--divider)]' />
			</header>

			<div className='sidebar-main px-4 py-4'>

				<div className='login-area'>

					{user ? (
						<div className='accounts-section flex flex-row align-middle items-center justify-between'>
							<img className='image rounded-3xl' data-alt-override='false' alt='G' width='38' height='38' loading='lazy' src={user.photoURL || ''}></img>
							<button
								onClick={logout}
								className='px-4 py-2 text-white bg-transparent border-[var(--divider)] border-2 rounded hover:cursor-pointer hover:bg-[rgb(20,20,20)] flex flex-row gap-4'
							>
								Log Out
							</button>
						</div>
					) : (
						<Login small />
					)}

				</div>
			</div>
		</div>
	);
}
