"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader, Calendar, Plus, MapPin, Clock } from "lucide-react";

// --- Reusable Mini Calendar Component ---
// This is a UI-only component for your demo.
const MiniCalendar = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // Static days for October 2025 (Starts on a Wednesday)
  const days = [
    "", "", 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, "", ""
  ];
  
  // Days to highlight for the demo
  const today = 22;
  const eventDays = [24, 28];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-white">October 2025</span>
        {/* Placeholder buttons */}
        <div className="flex gap-2">
          <button className="text-slate-400 hover:text-white">&lt;</button>
          <button className="text-slate-400 hover:text-white">&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm text-slate-400 mb-2">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday = day === today;
          const hasEvent = eventDays.includes(day as number);

          return (
            <div 
              key={index} 
              className={`
                flex items-center justify-center w-9 h-9 rounded-full
                ${isToday ? 'bg-blue-600 text-white' : ''}
                ${hasEvent ? 'bg-green-600/30 text-green-300' : ''}
                ${!isToday && !hasEvent && day ? 'text-slate-300 hover:bg-slate-800' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Reusable Event Card Component ---
const EventCard = ({ event }: { event: any }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6 transition-all hover:border-slate-700 hover:bg-black hover:cursor-pointer">
    <div className="flex gap-4">
      {/* Date Block */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center bg-slate-800 w-16 h-16 rounded-lg">
        <span className="text-xs font-bold text-red-400 uppercase">{event.month}</span>
        <span className="text-2xl font-bold text-white">{event.day}</span>
      </div>
      {/* Event Details */}
      <div>
        <span className="text-sm font-medium text-blue-400">{event.category}</span>
        <h3 className="text-xl font-semibold text-white mb-1">{event.title}</h3>
        <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Static Demo Data ---
const upcomingEvents = [
  {
    month: "OCT",
    day: 24,
    category: "Club Workshop",
    title: "CodeRave 'AI in Python' Workshop",
    time: "6:00 PM - 8:00 PM",
    location: "Auditorium Hall"
  },
  {
    month: "OCT",
    day: 28,
    category: "Tech Talk",
    title: "Guest Lecture: The Future of Web 3.0",
    time: "5:00 PM - 6:00 PM",
    location: "Seminar Hall 2"
  },
  {
    month: "NOV",
    day: 5,
    category: "Campus Life",
    title: "Annual Cultural Fest: Equinox '25",
    time: "All Day",
    location: "Main Ground"
  }
];

// --- Main Events Page Component ---
export default function EventsPage() {
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
          <Calendar className="w-8 h-8 text-green-400" />
          Events
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors shadow-lg hover:cursor-pointer">
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Event List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-white">Upcoming Events</h2>
          {upcomingEvents.map(event => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>

        {/* Right Column: Calendar */}
        <div className="lg:col-span-1 space-y-6">
          <MiniCalendar />
        </div>
        
      </div>
    </div>
  );
}
