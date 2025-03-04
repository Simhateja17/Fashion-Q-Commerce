export function handleApiError(error) {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    return error.response.data?.message || "An error occurred. Please try again.";
  } else if (error.request) {
    console.error("API No Response:", error.request);
    return "No response from the server. Please check your connection.";
  } else {
    console.error("API Request Error:", error.message);
    return "Unexpected error occurred. Please try again.";
  }
}
