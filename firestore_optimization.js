import { getFirestore, collection, query, where, getDocs, limit } from "firebase/firestore";

const db = getFirestore();

export async function getUserOrders(userId) {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId), limit(10)); // Limits to 10 results for better performance
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
