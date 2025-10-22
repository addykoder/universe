"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Mail, BookUser, CalendarDays, Edit, Loader } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  // This effect handles authentication protection for the page
  useEffect(() => {
    // If loading is finished and there's no user, redirect to sign-in
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Show a full-page loader while the auth state is being determined
  if (loading || !user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // A reusable component for displaying user information fields
  const InfoField = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string | number | null }) => (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex-shrink-0">
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-lg font-medium text-white">{value || "Not set"}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-bg text-white min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-bg rounded-2xl border border-slate-800 shadow-2xl p-8 relative">
        {/* Edit Profile Button */}
        <button className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <Edit className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <Image
					width={28}
					height={28}
            src={user.photoURL || `https://avatar.vercel.sh/${user.email}`}
            alt={user.displayName || "User"}
            className="w-28 h-28 rounded-full border-4 border-[var(--accent)] object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">{user.displayName}</h1>
            <p className="text-slate-400">{profile.profileComplete ? "Profile Complete" : "Profile Incomplete"}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-800 mb-8" />

        {/* User Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoField icon={Mail} label="Email Address" value={user.email} />
          <InfoField icon={BookUser} label="Department" value={profile.department} />
          <InfoField icon={CalendarDays} label="Year of Study" value={profile.year} />
        </div>
      </div>
    </div>
  );
}
