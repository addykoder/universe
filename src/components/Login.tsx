"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { ALLOWED_DOMAIN } from "@/utils/variables";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
    {...props}
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238
	C42.718,36.216,44,32.3,44,28C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
)

export default function Login({small=false}: {small?: boolean}) {

	const router = useRouter();
	const { login } = useAuth();

  return ( small?
		<div className="flex flex-row align-middle items-center w-full justify-center">
      <button
        onClick={login}
        className="px-4 py-2 text-white bg-transparent border-[var(--divider)] border-2 rounded hover:cursor-pointer hover:bg-[rgb(20,20,20)] flex flex-row gap-4 w-max m-auto"
      >
				<img className="image" data-alt-override="false" alt="G" width="22" height="22" loading="lazy" src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"></img>
        Sign In
      </button>
</div>
:
            <button
              onClick={login}
              className="inline-flex items-center justify-center w-full gap-3 px-6 py-3 font-semibold text-lg text-white bg-slate-700 rounded-lg shadow-md hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 hover:cursor-pointer"
            >
              <GoogleIcon />
              Sign in with Google
            </button>
  );
}


