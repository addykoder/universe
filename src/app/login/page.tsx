"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase"; // Assuming your firebase config is here
import { useRouter } from "next/navigation";
import Login from "@/components/Login";

// Replace with your college's actual email domain

// A simple Google Icon component


export default function SignInPage() {
  const router = useRouter();


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
      <div className="relative w-full max-w-md p-8 text-center">
        {/* Background Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 top-[-20rem] -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2563eb] to-[#14b8a6] opacity-30 sm:left-[calc(50%-15rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Sign-in Card */}
        <div className="relative z-10 p-8 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to <span className="text-blue-400">Uni-Verse</span>
          </h1>
          <p className="mt-4 text-slate-400">
            Sign in with your official college Google account to continue.
          </p>

          <div className="mt-10">
						<Login/>
          </div>
          <p className="mt-8 text-xs text-slate-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

