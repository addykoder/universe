'use client';

import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { ALLOWED_DOMAIN } from '@/utils/variables';

// Define the shape of your user object
interface User {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
}

// Define the shape of the context value
interface AuthContextType {
	user: User | null;
	loading: boolean;
	logout: () => Promise<void>;
	login: () => Promise<void>;

}

// 1. Create the Context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Create the Provider Component
interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// This is the core Firebase listener
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
			if (firebaseUser) {
				// User is signed in
				setUser({
					uid: firebaseUser.uid,
					email: firebaseUser.email,
					displayName: firebaseUser.displayName,
					photoURL: firebaseUser.photoURL,
				});
			} else {
				// User is signed out
				setUser(null);
			}
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	const login =  async () => {
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


	const logout = async () => {
		setUser(null);
		router.push('/');
		await signOut(auth);
	};

	return <AuthContext.Provider value={{ user, loading, logout, login }}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to use the context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
