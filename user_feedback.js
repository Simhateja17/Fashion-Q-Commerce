import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore();

// Submit a review
export async function submitReview(userId, productId, rating, comment) {
  await addDoc(collection(db, "reviews"), {
    userId,
    productId,
    rating,
    comment,
    timestamp: new Date(),
  });
  console.log("Review submitted successfully");
}

// Fetch reviews for a product
export async function getProductReviews(productId) {
  const reviewsRef = collection(db, "reviews");
  const snapshot = await getDocs(reviewsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(review => review.productId === productId);
}
