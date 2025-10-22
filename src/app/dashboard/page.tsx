'use client';

import ProfileSetupModal from "@/components/ProfileSetupModal";
import { useAuth } from "@/context/AuthContext";

export default function App() {
	const { user, profile,  loading, } = useAuth();
  const showModal = user && profile && !profile.profileComplete;
	return (
		<>

      {loading ?<div className="p-4 text-center">Loading...</div> : showModal && <ProfileSetupModal />}
			<h1 className='text-4xl font-light text-center py-8'>Dashboard</h1>
		</>
	);
}
