import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp, Timestamp, FieldValue } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";

// structure of our user profile
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  department?: string; // Optional fields to be filled in later
  year?: number;       // Optional fields to be filled in later
  profileComplete: boolean;
  createdAt: FieldValue;
}

/**
 * Checks if a user profile exists in Firestore. If not, creates one.
 * @param user The user object from Firebase Auth.
 * @returns The user's profile from Firestore.
 */
export const checkAndCreateUserProfile = async (user: FirebaseUser): Promise<UserProfile> => {
	// accessing the user database
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // User profile already exists, return it
    console.log("User profile found.");
    return userSnap.data() as UserProfile;
  } else {
    // User profile doesn't exist, create a new one
    console.log("No user profile found, creating one...");
    const newUserProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName!,
      photoURL: user.photoURL!,
      profileComplete: false, // This is the crucial flag
      createdAt: serverTimestamp(),
    };

    await setDoc(userRef, newUserProfile);
    return newUserProfile;
  }
};