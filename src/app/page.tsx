'use client';
import { Megaphone, Library, MessageSquare, Repeat, Calendar, ClipboardList, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// You can import your Navbar component here if you have one
// import Navbar from "@/components/Navbar";

export default function HomePage() {
	const features = [
		{
			icon: Megaphone,
			title: 'Smart Announcements',
			description: 'A central feed for all official updates from clubs, departments, and hostels. Never miss an important notice again.',
		},
		{
			icon: Library,
			title: 'Resource Hub',
			description: 'A one-stop shop for students to share and find lecture notes, PDFs, and other academic materials, organized by subject.',
		},
		{
			icon: MessageSquare,
			title: 'Q&A Forum',
			description: 'A campus-specific Quora where students can ask academic or general questions and get answers from peers and seniors.',
		},
		{
			icon: Repeat,
			title: 'Barter System',
			description: 'A peer-to-peer marketplace for students to exchange items like textbooks, electronics, and lab equipment safely.',
		},
		{
			icon: Calendar,
			title: 'Unified Event Hub',
			description: 'A single, filterable calendar that aggregates all campus events, from club meetings and fests to academic deadlines.',
		},
		{
			icon: ClipboardList,
			title: 'Forms & Polls',
			description: 'An in-built tool for clubs and faculty to create surveys, registration forms, and live polls without third-party apps.',
		},
	];

	return (
		<div className='bg-slate-900 text-white min-h-screen'>
			{/* If you have a Navbar component, you can place it here */}
			{/* <Navbar /> */}

			<main>
				{/* Hero Section */}
				<section className='relative text-center py-24 md:py-32 lg:py-40 overflow-hidden'>
					<div aria-hidden='true' className='absolute inset-0 top-[-10rem] z-0 transform-gpu overflow-hidden blur-3xl'>
						<div
							style={{
								clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
							}}
							className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2563eb] to-[#14b8a6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
						/>
					</div>
					<div className='mx-auto px-4 z-10 relative'>
						<div className='hero flex flex-row align-middle items-center justify-center'>
							<Image alt='universe logo' width='250' height='250' src='/icon.png' />
							<h2 className='text-8xl font-black text-[rgb(64,154,255)] hidden md:block'>ni-verse</h2>
						</div>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center'>
							Your Entire Campus, <span className='bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent'>Connected.</span>
						</h1>
						<p className='mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-300'>
							Say goodbye to scattered WhatsApp groups, missed notices, and disorganized resources. Uni-Verse brings everything your college needs into one seamless
							platform.
						</p>
						<div className='mt-10 flex justify-center gap-4'>
							<Link
								href='/login'
								className='inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105'
							>
								Get Started <ArrowRight className='w-5 h-5' />
							</Link>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id='features' className='py-20 sm:py-24'>
					<div className='container mx-auto px-4'>
						<div className='text-center'>
							<h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Everything You Need, In One Place</h2>
							<p className='mt-4 text-lg text-slate-400'>A complete toolkit for a modern, digital-first campus experience.</p>
						</div>
						<div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
							{features.map((feature, index) => {
								const Icon = feature.icon;
								return (
									<div
										key={index}
										className='p-8 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all duration-300'
									>
										<div className='inline-flex items-center justify-center w-12 h-12 mb-4 text-blue-400 bg-slate-900 rounded-lg'>
											<Icon className='w-6 h-6' />
										</div>
										<h3 className='text-xl font-semibold'>{feature.title}</h3>
										<p className='mt-2 text-slate-400'>{feature.description}</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className='py-20 sm:py-24'>
					<div className='container mx-auto px-4'>
						<div className='relative isolate overflow-hidden bg-slate-800 px-6 py-20 text-center shadow-2xl rounded-2xl sm:px-16'>
							<h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Ready to transform your campus experience?</h2>
							<p className='mt-4 text-lg text-slate-300'>Join your community today and stay in sync with everything happening at your college.</p>
							<Link
								href='/login'
								className='mt-8 inline-flex items-center gap-2 px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105'
							>
								Sign In & Get Started
							</Link>
							<div
								aria-hidden='true'
								className='absolute -top-24 left-1/2 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]'
							>
								<svg viewBox='0 0 1024 1024' className='absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 -translate-x-1/2'>
									<circle cx='512' cy='512' r='512' fill='url(#gradient-circle)' fillOpacity='0.7'></circle>
									<defs>
										<radialGradient id='gradient-circle'>
											<stop stopColor='#2563eb'></stop>
											<stop offset='1' stopColor='#14b8a6'></stop>
										</radialGradient>
									</defs>
								</svg>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className='py-8 border-t border-slate-800'>
				<div className='container mx-auto px-4 text-center text-slate-500'>
					<p>&copy; {new Date().getFullYear()} Uni-Verse. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
