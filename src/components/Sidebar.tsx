'use client';
import Image from 'next/image';
import ui from '../../ui.config';
import Login from './Login';
import { useAuth } from '@/context/AuthContext';
import ProfileSetupModal from './ProfileSetupModal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
	const { user, logout } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!user) router.push('/login');
	});

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

			<div className='sidebar-main px-4 py-4 min-h-[90vh] flex flex-col justify-between'>
				<div className='sidebar_content '>
					<div className='py-4'>
						<ul className='space-y-1'>
							<li key={'dashboard'}>
								<Link
									href={'/dashboard/'}
									className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 bg-blue-500 hover:text-white transition-colors'
								>
									{/* Icon */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
										<line x1='3' y1='9' x2='21' y2='9'></line>
										<line x1='9' y1='21' x2='9' y2='9'></line>
									</svg>
									{/* <item.icon className="w-5 h-5" /> */}
									{/* Label */}
									<span>Dashboard</span>
								</Link>
							</li>
						</ul>
						{/* Section Title */}
						<h3 className='px-3 mb-2 mt-6 text-xs font-semibold tracking-wider text-slate-500 uppercase'>Your Communities</h3>
						{/* Section Content - List of Links */}
						<ul className='space-y-1'>
							<li key={'Manage'}>
								<Link
									href={'/dashboard/manage'}
									className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors'
								>
									{/* Icon */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
										<line x1='3' y1='9' x2='21' y2='9'></line>
										<line x1='9' y1='21' x2='9' y2='9'></line>
									</svg>
									{/* <item.icon className="w-5 h-5" /> */}
									{/* Label */}
									<span>Manage</span>
								</Link>
							</li>
							<li key={'announcements'}>
								<Link
									href={'/dashboard/announcements'}
									className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors'
								>
									{/* Icon */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'></path>
										<path d='M13.73 21a2 2 0 0 1-3.46 0'></path>
									</svg>
									{/* <item.icon className="w-5 h-5" /> */}
									{/* Label */}
									<span>Announcements</span>
								</Link>
							</li>
							<li key={'Events'}>
								<Link
									href={'/dashboard/events'}
									className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors'
								>
									{/* Icon */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
										<line x1='16' y1='2' x2='16' y2='6'></line>
										<line x1='8' y1='2' x2='8' y2='6'></line>
										<line x1='3' y1='10' x2='21' y2='10'></line>
									</svg>
									{/* <item.icon className="w-5 h-5" /> */}
									{/* Label */}
									<span>Events</span>
								</Link>
							</li>
						</ul>

						<h3 className='px-3 mb-2 mt-6 text-xs font-semibold tracking-wider text-slate-500 uppercase'>Campus</h3>
						<ul className='space-y-1'>
							<li key={'resource'}>
								<Link
									href={'/dashboard/resource-sharing'}
									className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors'
								>
									{/* Icon */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M4 22h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z'></path>
										<path d='M16 2v4a2 2 0 0 0 2 2h4'></path>
										<path d='M12 18h-1a2 2 0 1 1 0-4h1'></path>
										<path d='M18 18h-1a2 2 0 1 1 0-4h1'></path>
									</svg>
									{/* <item.icon className="w-5 h-5" /> */}
									{/* Label */}
									<span>Resource Sharing</span>
								</Link>
							</li>
							<li key={'qna'}>
								<Link
									href={'/dashboard/qna'}
									className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors'
								>
									{/* Icon */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
										<path d='M12 11.5A2.5 2.5 0 0 1 9.5 9a2.5 2.5 0 0 1 5 0A2.5 2.5 0 0 1 12 11.5z'></path>
										<path d='M8 8.5a2.5 2.5 0 0 1 2.5-2.5'></path>
										<path d='M16 8.5a2.5 2.5 0 0 0-2.5-2.5'></path>
									</svg>
									{/* <item.icon className="w-5 h-5" /> */}
									{/* Label */}
									<span>Q&A</span>
								</Link>
							</li>
							<li key={'BuySell'}>
								<Link
									href={'/dashboard/buy-sell'}
									className='flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors'
								>
									{/* Icon */}
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'></path>
										<line x1='7' y1='7' x2='7.01' y2='7'></line>
									</svg>
									{/* <item.icon className="w-5 h-5" /> */}
									{/* Label */}
									<span>Buy / Sell</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className='login-area '>
					{/* 3. Conditionally render the modal */}
					{/* {loading ?<div className="p-4 text-center">Loading...</div> : showModal && <ProfileSetupModal />} */}

					{user ? (
						<div className='accounts-section flex flex-row align-middle items-center justify-between gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors'>
							<div onClick={()=> router.push('/dashboard/profile')} className='left flex flex-row gap-2 hover:cursor-pointer'>
								<img
									
									className='image rounded-3xl'
									data-alt-override='false'
									alt='G'
									width='38'
									height='38'
									loading='lazy'
									src={user.photoURL || ''}
								></img>
								<div className='content'>
									<div className='name text-white text-sm'>{user.displayName?.split(' ')[0]}</div>
									<div className='mail text-white opacity-40 text-sm'>{user.email?.slice(0,9)}</div>
								</div>
							</div>
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
