import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

// Fetch recommended products based on past purchases
export async function getRecommendedProducts(userId) {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  const purchasedProductIds = new Set();
  querySnapshot.docs.forEach(doc => {
    doc.data().items.forEach(item => purchasedProductIds.add(item.productId));
  });
  
  const productsRef = collection(db, "products");
  const recommendedQuery = query(productsRef, where("id", "not-in", Array.from(purchasedProductIds)));
  const recommendedSnapshot = await getDocs(recommendedQuery);
  
  return recommendedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
