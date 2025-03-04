import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

// Create a new discount offer
export async function createDiscountOffer(code, discountPercentage, expiryDate) {
  await addDoc(collection(db, "discounts"), {
    code,
    discountPercentage,
    expiryDate,
    status: "Active",
    createdAt: new Date(),
  });
  console.log("Discount offer created successfully");
}

// Fetch active discount offers
export async function getActiveDiscounts() {
  const discountsRef = collection(db, "discounts");
  const q = query(discountsRef, where("status", "==", "Active"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
