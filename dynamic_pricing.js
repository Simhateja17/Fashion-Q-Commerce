import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const db = getFirestore();

// Update product price dynamically
export async function updatePrice(productId, newPrice) {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, { price: newPrice });
  console.log("Price updated successfully");
}

// Get real-time price of a product
export async function getRealTimePrice(productId) {
  const productRef = doc(db, "products", productId);
  const productDoc = await getDoc(productRef);
  if (!productDoc.exists()) throw new Error("Product not found");
  return productDoc.data().price;
}
