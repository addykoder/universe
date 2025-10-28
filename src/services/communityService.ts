import { 
  db,
  auth
} from "@/lib/firebase"; 
import { 
  doc,
  addDoc,
  updateDoc,     // Import updateDoc
  arrayUnion,    // Import arrayUnion
  getDocs,       // Import getDocs
  serverTimestamp,
  collection,
  Timestamp,
  FieldValue,
  query,         // Import query
  where          // Import where
} from "firebase/firestore"; 
import { UserProfile } from "./userService"; 

// 1. Define the Member data structure
export interface CommunityMember {
  uid: string;
  email: string;
  name: string;
  role: "admin" | "member";
  joinedAt: Timestamp | Date; 
}

// 2. Define the Community data structure
export interface Community {
  name: string;
  description: string;
  creatorUid: string;
  creatorName: string;
  createdAt: Timestamp | FieldValue;
  members: CommunityMember[]; 
}

// --- NEW TYPE ---
// This will be our type for communities fetched from Firestore
export type CommunityWithId = Community & { id: string };

// 3. The function to create a new community (no changes)
export const createCommunity = async (
  formData: { name: string; description: string },
  user: UserProfile
): Promise<string> => {
  
  // --- ROBUST VALIDATION ---
// ... (existing createCommunity function code) ...
  if (!user || !user.uid) {
// ...
  }
  
  if (!user.email) {
// ...
  }
  
  const userName = user.displayName
// ...
  // --- END VALIDATION ---

  // Get a reference to the 'communities' collection
  const communitiesCollectionRef = collection(db, "communities");

  // Create the first member (the creator)
  const firstMember: CommunityMember = {
// ...
    joinedAt: new Date(), 
  };

  // Create the new community object
  const newCommunity: Community = {
// ...
    members: [firstMember], 
  };

  // --- SIMPLE addDoc LOGIC ---
  try {
    const docRef = await addDoc(communitiesCollectionRef, newCommunity);
    return docRef.id;
  } catch (error) {
    console.error("Error creating community with addDoc:", error);
    throw new Error(`Firestore 'addDoc' failed: ${error}`);
  }
};

// --- NEW FUNCTION ---
// 4. Fetches all communities from Firestore
export const getAllCommunities = async (): Promise<CommunityWithId[]> => {
  const communitiesCollectionRef = collection(db, "communities");
  const querySnapshot = await getDocs(communitiesCollectionRef);
  
  return querySnapshot.docs.map(doc => {
    // Combine the document ID with the document data
    return { ...doc.data() as Community, id: doc.id };
  });
};

// --- NEW FUNCTION ---
// 5. Joins a community
export const joinCommunity = async (communityId: string, user: UserProfile): Promise<void> => {
  if (!user.uid || !user.email) {
    throw new Error("User data is incomplete. Cannot join community.");
  }

  const communityRef = doc(db, "communities", communityId);

  const newMember: CommunityMember = {
    uid: user.uid,
    email: user.email,
    name: user.displayName || user.email.split('@')[0],
    role: "member", // New users join as 'member'
    joinedAt: new Date()
  };

  try {
    // Use updateDoc with arrayUnion to add the new member
    await updateDoc(communityRef, {
      members: arrayUnion(newMember)
    });
  } catch (error) {
    console.error("Error joining community:", error);
    throw new Error(`Firestore 'updateDoc' failed: ${error}`);
  }
};

