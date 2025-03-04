import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore();

// Log a product's sustainability data
export async function logSustainabilityData(productId, ecoScore, materialsUsed, carbonFootprint) {
  await addDoc(collection(db, "sustainability"), {
    productId,
    ecoScore,
    materialsUsed,
    carbonFootprint,
    loggedAt: new Date(),
  });
  console.log("Sustainability data logged successfully");
}

// Fetch sustainability data for a product
export async function getSustainabilityData(productId) {
  const sustainabilityRef = collection(db, "sustainability");
  const querySnapshot = await getDocs(sustainabilityRef);
  return querySnapshot.docs.map(doc => doc.data()).filter(data => data.productId === productId);
}
