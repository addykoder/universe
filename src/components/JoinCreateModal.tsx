"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { CommunityWithId, joinCommunity } from "@/services/communityService";
import { Loader, X, PlusCircle, Users } from "lucide-react";
import { toast } from "react-toastify";

interface JoinCreateModalProps {
  joinableCommunities: CommunityWithId[];
  onClose: () => void;
  onCommunityJoined: () => void; // Function to refresh the manage page
}

export default function JoinCreateModal({
  joinableCommunities,
  onClose,
  onCommunityJoined,
}: JoinCreateModalProps) {
  const { user, profile } = useAuth();
  const [view, setView] = useState<"choice" | "join">("choice");
  const [isJoining, setIsJoining] = useState<string | null>(null); // Stores ID of community being joined

  const handleJoin = async (communityId: string) => {
    if (!profile) return;
    setIsJoining(communityId);

    try {
      await joinCommunity(communityId, profile);
			
      toast.success("Successfully joined community!");
      onCommunityJoined(); // Call the refresh function
      onClose(); // Close the modal
    } catch (error) {
      toast("Failed to join community. Please try again.");
    } finally {
      setIsJoining(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
        <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* View 1: The Initial Choice */}
          {view === "choice" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white text-center">
                Get Involved
              </h2>
              <p className="text-center text-slate-400">
                Create a new community or join one that already exists.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard/manage/create-community" // The new route you requested
                  onClick={onClose}
                  className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
                >
                  <PlusCircle className="w-12 h-12 text-green-400 mb-4" />
                  <span className="text-xl font-semibold">Create Community</span>
                </Link>
                <button
                  onClick={() => setView("join")}
                  className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
                >
                  <Users className="w-12 h-12 text-blue-400 mb-4" />
                  <span className="text-xl font-semibold">Join Community</span>
                </button>
              </div>
            </div>
          )}

          {/* View 2: The "Join" List */}
          {view === "join" && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Join a Community
              </h2>
              <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                {joinableCommunities.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">
                    You've already joined all available communities!
                  </p>
                ) : (
                  joinableCommunities.map((community) => (
                    <div
                      key={community.id}
                      className="flex items-center justify-between p-4 bg-slate-800 rounded-lg"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {community.name}
                        </h3>
                        <p className="text-sm text-slate-400 truncate max-w-sm">
                          {community.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleJoin(community.id)}
                        disabled={isJoining === community.id}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors disabled:bg-slate-600"
                      >
                        {isJoining === community.id ? (
                          <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                          "Join"
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
