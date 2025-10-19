"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfileSetupModal() {
  const { user } = useAuth();
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !department || !year) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const userRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userRef, {
        department,
        year,
        profileComplete: true,
      });
      // The modal will automatically close because the context updates
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-[rgb(10,10,10)] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[var(--divider)]">
        <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
        <p className="text-slate-400 mb-6">Welcome! Please add a few details to get started.</p>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-300">Department</label>
            <input
              id="department"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 block w-full bg-slate-900 border-slate-900 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Computer Science"
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-slate-300">Year of Study</label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value === '' ? '' : parseInt(e.target.value))}
              className="mt-1 block w-full bg-slate-900 border-slate-900 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 2"
              min="1"
              max="4"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 transition-colors"
          >
            {loading ? "Saving..." : "Save and Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}