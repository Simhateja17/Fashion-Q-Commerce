import { getFirestore, doc, updateDoc, getDoc, increment } from "firebase/firestore";

const db = getFirestore();

// Update product stock after an order
export async function updateStock(productId, quantitySold) {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, { stock: increment(-quantitySold) });
  console.log("Stock updated successfully");
}

// Check if a product is in stock
export async function checkStock(productId) {
  const productRef = doc(db, "products", productId);
  const productDoc = await getDoc(productRef);
  if (!productDoc.exists()) throw new Error("Product not found");
  return productDoc.data().stock > 0;
}
