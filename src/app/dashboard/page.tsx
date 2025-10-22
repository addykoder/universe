'use client';

import ProfileSetupModal from "@/components/ProfileSetupModal";
import { useAuth } from "@/context/AuthContext";
import LiveClock from "@/components/LiveClock";
import { Megaphone, Calendar, BookUser, BarChart, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

// Placeholder Card component if you don't have one
  var Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-slate-900 border hover:bg-black border-slate-800 rounded-xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );

// Reusable component for list items in widgets
const ListItem = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="py-3 border-b border-slate-800 last:border-b-0">
    <p className="font-medium text-white">{title}</p>
    <p className="text-sm text-slate-400">{subtitle}</p>
  </div>
);

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
	const router = useRouter();
  const showModal = user && profile && !profile.profileComplete;

  if (loading || !user || !profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Fake data for the demo
  const announcements = [
    { title: "Library Closure", subtitle: "The library will be closed this Friday..." },
    { title: "AI Workshop Registrations", subtitle: "Registrations are now open for..." },
  ];

  const events = [
    { title: "Hackathon Elimination Round", subtitle: "Tonight at 6:00 PM" },
    { title: "CodeRave Tech Talk", subtitle: "Tomorrow at 7:00 PM" },
  ];

  const profileCompletion = profile.profileComplete ? 100 : 50; // Simple logic for demo

  return (
		
			
    <div className="text-white p-12">

      {loading ?<div className="p-4 text-center">Loading...</div> : showModal && <ProfileSetupModal />}
      {/* 1. Welcome Banner */}
      <div className=" border border-slate-800 rounded-xl p-6 mb-6 flex items-center gap-4 bg-black">
        <span className="text-3xl">👋</span>
        <div>
          <h1 className="text-2xl font-bold">Hi, {user.displayName?.split(" ")[0]}!</h1>
          <p className="text-slate-400">It's nice to see you in the Dashboard.</p>
        </div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Announcements Card */}
            <Card className="hover:cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-blue-400" />
                Recent Announcements
              </h2>
              <div className="divide-y divide-slate-800">
                {announcements.map((item, i) => (
                  <ListItem key={i} title={item.title} subtitle={item.subtitle} />
                ))}
              </div>
            </Card>

            {/* Upcoming Events Card */}
            <Card className="hover:cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                Upcoming Events
              </h2>
              <div className="divide-y divide-slate-800">
                {events.map((item, i) => (
                  <ListItem key={i} title={item.title} subtitle={item.subtitle} />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Live Clock */}
          <LiveClock />

          {/* Profile Status Card */}
          <Card  className="hover:cursor-pointer">
						<div onClick={() => router.push('/dashboard/profile')}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookUser className="w-5 h-5 text-purple-400" />
              Profile Status
            </h2>
            <p className="text-sm text-slate-400 mb-2">Your profile is {profileCompletion}% complete.</p>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all" 
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            {!profile.profileComplete && (
              <button 
                onClick={() => router.push('/dashboard/profile')} 
                className="text-sm font-medium text-blue-400 hover:text-blue-300 mt-3"
              >
                Complete your profile →
              </button>
            )}
</div>
          </Card>

        </div>
      </div>
    </div>
  );
}
