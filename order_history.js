import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

// Fetch user order history
export async function getUserOrderHistory(userId) {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
