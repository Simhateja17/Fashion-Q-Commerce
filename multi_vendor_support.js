import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

// Register a new vendor
export async function registerVendor(vendorName, contactEmail) {
  await addDoc(collection(db, "vendors"), {
    vendorName,
    contactEmail,
    status: "Active",
    createdAt: new Date(),
  });
  console.log("Vendor registered successfully");
}

// Fetch all active vendors
export async function getActiveVendors() {
  const vendorsRef = collection(db, "vendors");
  const q = query(vendorsRef, where("status", "==", "Active"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
