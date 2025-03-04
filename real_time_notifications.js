import admin from "firebase-admin";

export async function sendNotification(userId, title, message) {
  const userToken = await getUserToken(userId);
  if (!userToken) return;

  const payload = {
    notification: {
      title,
      body: message,
    },
  };

  await admin.messaging().sendToDevice(userToken, payload);
  console.log(`Notification sent to user: ${userId}`);
}

async function getUserToken(userId) {
  // Fetch user FCM token from Firestore
  const db = admin.firestore();
  const userDoc = await db.collection("users").doc(userId).get();
  return userDoc.exists ? userDoc.data().fcmToken : null;
}
