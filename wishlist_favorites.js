import { getFirestore, doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";

const db = getFirestore();

// Add product to wishlist
export async function addToWishlist(userId, productId) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) throw new Error("User not found");
  
  await updateDoc(userRef, {
    wishlist: arrayUnion(productId),
  });
  console.log("Product added to wishlist");
}

// Get user's wishlist
export async function getWishlist(userId) {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data().wishlist || [] : [];
}
