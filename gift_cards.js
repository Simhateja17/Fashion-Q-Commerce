import { getFirestore, collection, addDoc, doc, updateDoc, getDoc, increment } from "firebase/firestore";

const db = getFirestore();

// Issue a new gift card
export async function issueGiftCard(userId, amount) {
  const giftCardRef = await addDoc(collection(db, "gift_cards"), {
    userId,
    amount,
    redeemed: false,
    issuedAt: new Date(),
  });
  console.log("Gift card issued successfully");
  return giftCardRef.id;
}

// Redeem a gift card
export async function redeemGiftCard(cardId, userId) {
  const cardRef = doc(db, "gift_cards", cardId);
  const cardDoc = await getDoc(cardRef);
  if (!cardDoc.exists() || cardDoc.data().redeemed) throw new Error("Invalid or already redeemed gift card");

  await updateDoc(cardRef, { redeemed: true });
  await updateDoc(doc(db, "users", userId), { storeCredits: increment(cardDoc.data().amount) });
  console.log("Gift card redeemed successfully");
}
