'use client';

import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { ALLOWED_DOMAIN } from '@/utils/variables';
import { checkAndCreateUserProfile } from "@/services/userService";
import { toast } from 'react-toastify';
import { auth, db } from "@/lib/firebase";
import { UserProfile } from "@/services/userService";

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
	profile: UserProfile | null;
	loading: boolean;
	logout: () => Promise<void>;
	login: () => Promise<void>;
}

// 1. Create the Context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState<UserProfile | null>(null);
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

				const userRef = doc(db, "users", firebaseUser.uid);
        const unsubProfile = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setProfile(doc.data() as UserProfile);
          } else {
            setProfile(null);
          }
          setLoading(false);
        });
        return () => unsubProfile(); // Cleanup profile listener
			} else {
				// User is signed out
				setUser(null);
				setProfile(null);
			}
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	const login = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider)
			const user = result.user;

			// **This is the critical check**
			if (user.email && user.email.endsWith(ALLOWED_DOMAIN)) {
				await checkAndCreateUserProfile(user);
				toast.success(`Successfully Logged in as ${user.displayName}!`);
				// redirecting to dashboard after successful login
				router.push('/dashboard');
			} else {
				// email not allowed, instantly log out the user
				await auth.signOut();
				toast.warn(`Sorry, only emails from @${ALLOWED_DOMAIN} are allowed.`);
			}
		} catch (error) {
			toast.error('Some error occurred during Google SingIn');
		}
	};

	const logout = async () => {
		setUser(null);
		setProfile(null);
		router.push('/');
		await signOut(auth);
		toast.info('You have been logged out.');
	};

	return <AuthContext.Provider value={{ user, profile, loading, logout, login }}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook to use the context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
