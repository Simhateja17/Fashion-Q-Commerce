import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

// Submit a support ticket
export async function submitSupportTicket(userId, message) {
  await addDoc(collection(db, "support_tickets"), {
    userId,
    message,
    status: "Open",
    timestamp: new Date(),
  });
  console.log("Support ticket submitted successfully");
}

// Fetch user support tickets
export async function getUserSupportTickets(userId) {
  const ticketsRef = collection(db, "support_tickets");
  const q = query(ticketsRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
