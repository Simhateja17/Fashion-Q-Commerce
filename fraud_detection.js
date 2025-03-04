import axios from "axios";

const FRAUD_DETECTION_API = "https://api.example.com/fraud-detection"; // Placeholder API

// Analyze order for potential fraud
export async function analyzeFraud(orderData) {
  try {
    const response = await axios.post(FRAUD_DETECTION_API, orderData);
    return response.data.riskScore > 80 ? "High Risk" : "Low Risk";
  } catch (error) {
    console.error("Error analyzing fraud risk:", error);
    return "Unknown Risk";
  }
}
