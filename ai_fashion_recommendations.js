import axios from "axios";

const AI_RECOMMENDATION_API = "https://api.example.com/fashion-ai"; // Placeholder API

// Get AI-powered fashion recommendations
export async function getFashionRecommendations(userId) {
  try {
    const response = await axios.post(AI_RECOMMENDATION_API, { userId });
    return response.data.recommendations;
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    return [];
  }
}
