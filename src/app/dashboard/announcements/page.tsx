"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader, Megaphone, Clock, User } from "lucide-react";

// Placeholder static data for the demo
const announcements = [
  {
    id: 1,
    category: "Academics",
    title: "Mid-Term Exam Schedule Announced",
    author: "Admin Office",
    date: "October 22, 2025",
    content: "The mid-term examination schedule for all departments has been published. Please check the portal for your respective timetables...",
  },
  {
    id: 2,
    category: "Clubs",
    title: "CodeRave 'AI in Python' Workshop Registrations Open",
    author: "CodeRave Club",
    date: "October 21, 2025",
    content: "We are excited to announce our first workshop of the semester! Registrations are now open for the 'AI in Python' workshop. Limited seats available.",
  },
  {
    id: 3,
    category: "Campus",
    title: "Library Closing Early for Maintenance",
    author: "Library Staff",
    date: "October 20, 2025",
    content: "Please be advised that the central library will be closing at 5:00 PM on Friday, October 24th, for scheduled maintenance.",
  },
];

// Reusable tag component
const Tag = ({ text }: { text: string }) => (
  <span className="inline-block bg-blue-600/20 text-blue-300 rounded-full px-3 py-1 text-xs font-medium">
    {text}
  </span>
);

export default function AnnouncementsPage() {
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
    <div className="text-white max-w-4xl mx-auto p-6 md:p-12">
      {/* Page Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
        <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
          <Megaphone className="w-8 h-8 text-blue-400" />
          Announcements
        </h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors shadow-lg hover:cursor-pointer">
          Create Post
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-4 py-1.5 bg-slate-800 text-white rounded-full text-sm font-medium hover:bg-slate-700">All</button>
        <button className="px-4 py-1.5 bg-slate-900 text-slate-400 rounded-full text-sm font-medium hover:bg-slate-700 hover:text-white">Academics</button>
        <button className="px-4 py-1.5 bg-slate-900 text-slate-400 rounded-full text-sm font-medium hover:bg-slate-700 hover:text-white">Clubs</button>
        <button className="px-4 py-1.5 bg-slate-900 text-slate-400 rounded-full text-sm font-medium hover:bg-slate-700 hover:text-white">Campus</button>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-6">
        {announcements.map((post) => (
          <div 
            key={post.id}
            className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 transition-all hover:border-slate-700 hover:bg-black"
          >
            <div className="flex items-center justify-between mb-2">
              <Tag text={post.category} />
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>
            
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 hover:text-blue-400 cursor-pointer">
              {post.title}
            </h2>
            
            <p className="text-slate-300 mb-4 line-clamp-2">
              {post.content}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <button className="text-sm font-medium text-blue-400 hover:text-blue-300">
                Read more →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
