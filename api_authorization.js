import axios from "axios";
import { getAuth } from "firebase/auth";

export async function authorizedRequest(url, method = "GET", data = null) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  return axios({
    url,
    method,
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
}
