"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  Loader, 
  Briefcase, 
  Plus, 
  Users, 
  ShieldCheck, 
  User, 
  Settings, 
  LogOut 
} from "lucide-react";

// --- Static Demo Data ---
// Updated with your specific communities

interface CommunityInterface {
	id: number;
	name: string;
	description: string;
	role: "admin" | "member";
	members: number;
}

const myCommunities = [
  {
    id: 1,
    name: "Technobyte",
    description: "The official hub for all things tech, from web dev to AI and cloud.",
    role: "admin",
    members: 210,
  },
  {
    id: 2,
    name: "Microbus",
    description: "For enthusiasts of electronics, robotics, and embedded systems.",
    role: "member",
    members: 130,
  },
  {
    id: 3,
    name: "Anamika",
    description: "The Hindi society, celebrating cultural events, poetry, and debates.",
    role: "member",
    members: 95,
  },
  {
    id: 4,
    name: "OCD",
    description: "The competitive coding club for hardcore algorithm and data structure practice.",
    role: "admin",
    members: 80,
  },
  {
    id: 5,
    name: "Aeromodelling",
    description: "Building, flying, and innovating with drones and RC planes.",
    role: "member",
    members: 65,
  },
  {
    id: 6,
    name: "Anant",
    description: "The mathematics society, exploring the beauty of numbers and proofs.",
    role: "member",
    members: 50,
  },
];

// --- Reusable Role Badge Component ---
const RoleBadge = ({ role }: { role: "admin" | "member" }) => {
  const isAdmin = role === "admin";
  return (
    <span 
      className={`
        inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium
        ${isAdmin 
          ? "bg-yellow-600/20 text-yellow-300" 
          : "bg-blue-600/20 text-blue-300"
        }
      `}
    >
      {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
      {isAdmin ? "Admin" : "Member"}
    </span>
  );
};

// --- Reusable Community Card Component ---
const CommunityCard = ({ community }: { community: {id: number, name:string, description: string, role:'admin' | 'member', members:number} }) => {
  const isAdmin = community.role === "admin";
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 flex flex-col transition-all hover:border-slate-700">
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-white">{community.name}</h3>
          <RoleBadge role={community.role} />
        </div>
        <p className="text-slate-400 mb-4 line-clamp-2">{community.description}</p>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users className="w-4 h-4" />
          <span>{community.members} members</span>
        </div>
      </div>
      
      {/* Conditional Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex gap-3">
        {isAdmin ? (
          <>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors text-sm">
              <Settings className="w-4 h-4" />
              Manage
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium text-slate-300 transition-colors text-sm">
              View
            </button>
          </>
        ) : (
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg font-medium text-red-400 transition-colors text-sm">
            <LogOut className="w-4 h-4" />
            Leave
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main Manage Page Component ---
export default function ManagePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to sign-in if the user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Show a loader while auth state is being confirmed
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-white max-w-7xl mx-auto p-6 md:p-12">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-purple-400" />
          Manage Communities
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          Create / Join
        </button>
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCommunities.map(community => (
          <CommunityCard key={community.id} community={community as CommunityInterface} />
        ))}
      </div>
    </div>
  );
}

