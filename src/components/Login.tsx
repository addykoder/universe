"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

// emails only with this domain are allowed
const ALLOWED_DOMAIN = "nitkkr.ac.in";

export default function Login() {
	const router = useRouter();
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // **This is the critical check**
      if (user.email && user.email.endsWith(ALLOWED_DOMAIN)) {
        console.log("Successfully logged in:", user.email);
				// redirecting to dashboard after successful login
				router.push('/dashboard');
      } else {
				// email not allowed, instantly log out the user
        await auth.signOut();
        alert(`Sorry, only emails from @${ALLOWED_DOMAIN} are allowed.`);
      }
    } catch (error) {
      console.error("Error during Google signin:", error);
    }
  };
	
	const handleMailSignIn = async () => {
		return
	}


  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Sign in with Google
      </button>
      {/* We will add the email OTP form here later */}
    </div>
  );
}