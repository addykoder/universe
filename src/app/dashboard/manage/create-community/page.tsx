"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createCommunity } from "@/services/communityService";
import { Loader, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
export default function CreateCommunityPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth protection
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || !name || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    const formData = { name, description };

    try {
      // 1. Await the promise from your service
      const newCommunityId = await createCommunity(formData, profile);

      // 2. Show success toast
      toast.success("Community created successfully!");

      // 3. Redirect to the correct page
      router.push("/dashboard/manage"); 

    } catch (error) {
      // 4. Show error toast
      console.error(error);
      toast.error("Failed to create community. Please try again.");
    } finally {
      // 5. Reset the loading state
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="text-white max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold flex items-center gap-3 mb-8">
          <PlusCircle className="w-8 h-8 text-green-400" />
          Create a New Community
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Community Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Technobyte"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What is your community about?"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors shadow-lg disabled:bg-slate-700"
            >
              {isSubmitting ? "Creating..." : "Create Community"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
