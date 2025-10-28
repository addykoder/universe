"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  getAllCommunities, 
  CommunityWithId, 
  CommunityMember 
} from "@/services/communityService";
import Link from "next/link";
import { 
  Loader, 
  Briefcase, 
  Plus, 
  ShieldCheck, 
  User 
} from "lucide-react";
import JoinOrCreateModal from "@/components/JoinCreateModal"; // Import the modal
import Portal from "@/components/Portal"; // Import the Portal
import { toast } from "react-toastify";

// --- Community Card ---
interface CommunityCardProps {
  community: CommunityWithId;
  userRole: "admin" | "member";
}

const CommunityCard = ({ community, userRole }: CommunityCardProps) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 flex flex-col relative">
    {userRole === "admin" && (
      <span className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-900/50 px-2 py-1 rounded-full">
        <ShieldCheck className="w-3.5 h-3.5" />
        Admin
      </span>
    )}
    {userRole === "member" && (
      <span className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-full">
        <User className="w-3.5 h-3.5" />
        Member
      </span>
    )}
    <h2 className="text-2xl font-bold text-white mb-2 pr-20">{community.name}</h2>
    <p className="text-slate-400 mb-6 flex-grow">{community.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-500">
        {community.members.length} member(s)
      </span>
      <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-semibold transition-colors">
        Manage
      </button>
    </div>
  </div>
);

// --- Main Manage Page Component ---
export default function ManagePage() {
  const { user, profile, loading: authLoading } = useAuth(); // Get profile as well
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  
  // State for all communities
  const [myCommunities, setMyCommunities] = useState<CommunityWithId[]>([]);
  const [joinableCommunities, setJoinableCommunities] = useState<CommunityWithId[]>([]);
  
  // --- Data Fetching ---
  const fetchCommunities = async () => {
    if (!user) {
      console.log("fetchCommunities called, but no user found. Aborting.");
      return;
    }
    
    console.log("Starting to fetch communities...");

    try {
      const allCommunities = await getAllCommunities();
      
      // --- DEBUGGING ---
      console.log("Fetched all communities:", allCommunities);
      console.log("Current User UID:", user.uid);
      // --- END DEBUGGING ---

      const myComm: CommunityWithId[] = [];
      const joinableComm: CommunityWithId[] = [];

      allCommunities.forEach(community => {
        // --- DEBUGGING ---
        // Ensure community.members exists before trying to use .some()
        const isMember = community.members && Array.isArray(community.members) 
          ? community.members.some(member => member.uid === user.uid)
          : false;
        console.log(`Checking community: ${community.name}. Is user a member? ${isMember}`);
        // --- END DEBUGGING ---

        if (isMember) {
          myComm.push(community);
        } else {
          joinableComm.push(community);
        }
      });

      // --- DEBUGGING ---
      console.log("My Communities:", myComm);
      console.log("Joinable Communities:", joinableComm);
      // --- END DEBUGGING ---

      setMyCommunities(myComm);
      setJoinableCommunities(joinableComm);

    } catch (error) {
      console.error("Failed to fetch communities:", error);
      toast.error("Could not load your communities. Check console for errors.");
    } finally {
      setPageLoading(false); // Set to false after first load
    }
  };

  // Fetch data on load (and when user changes)
  useEffect(() => {
    if (!authLoading && user) {
      fetchCommunities();
    }
    // Auth protection
    if (!authLoading && !user) {
      router.push("/signin");
    }
  }, [user, authLoading, router]);

  // Main loader for auth or initial data fetching
  if (authLoading || pageLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Function to find user's role in a specific community
  const getUserRole = (community: CommunityWithId): "admin" | "member" => {
    if (!user) return "member"; // Should not happen if user is logged in
    const member = community.members.find(m => m.uid === user.uid);
    return member?.role || "member";
  };

  return (
    <>
      <div className="text-white max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-purple-400" />
            Manage Communities
          </h1>
          
          {/* Updated Button to open modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create / Join
          </button>
        </div>

        {/* My Communities Section */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-300 mb-4">
            Your Communities
          </h2>
          {myCommunities.length === 0 ? (
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl">
              <p className="text-slate-400">You haven't joined any communities yet.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 font-semibold text-blue-500 hover:text-blue-400"
              >
                Click here to join one!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  userRole={getUserRole(community)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* The Modal (rendered in a Portal) */}
      {isModalOpen && (
        <Portal>
          <JoinOrCreateModal
            joinableCommunities={joinableCommunities}
            onClose={() => setIsModalOpen(false)}
            onCommunityJoined={fetchCommunities} // Refresh list on join
          />
        </Portal>
      )}
    </>
  );
}

