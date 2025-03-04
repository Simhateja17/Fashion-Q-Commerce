import { getFirestore, collection, addDoc, getDoc, doc, updateDoc, increment } from "firebase/firestore";

const db = getFirestore();

// Generate a referral code for a user
export async function generateReferralCode(userId) {
  const referralCode = `REF-${userId.substring(0, 6)}`;
  await updateDoc(doc(db, "users", userId), { referralCode });
  console.log("Referral code generated successfully");
  return referralCode;
}

// Apply referral code and reward users
export async function applyReferral(referralCode, newUserId) {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDoc(doc(usersRef, referralCode));
  if (!querySnapshot.exists()) throw new Error("Invalid referral code");

  const referrerId = querySnapshot.id;
  await updateDoc(doc(db, "users", referrerId), { rewards: increment(100) });
  await updateDoc(doc(db, "users", newUserId), { rewards: increment(50) });
  console.log("Referral applied successfully");
}
