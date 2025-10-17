import Link from 'next/link';

export default function Home() {
	// Blog type content outside of the dashboard
	return (
		<>
			<Link className='text-lg text-center block' href={'/dashboard'}>
				Go to Dashboard
			</Link>
			<h1 className='text-4xl font-light text-center py-8'>Home Page</h1>
		</>
	);
}
