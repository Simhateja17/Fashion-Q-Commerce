import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const db = getFirestore();

// Update user loyalty points
export async function updateLoyaltyPoints(userId, points) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { loyaltyPoints: points });
  console.log("Loyalty points updated successfully");
}

// Get user membership tier
export async function getMembershipTier(userId) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) throw new Error("User not found");

  const points = userDoc.data().loyaltyPoints || 0;
  if (points >= 1000) return "Gold";
  if (points >= 500) return "Silver";
  return "Bronze";
}
