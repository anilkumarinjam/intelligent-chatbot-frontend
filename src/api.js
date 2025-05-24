import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Your backend URL

export const sendQuery = async (query, generateChart = true) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/query/nl?generate_chart=${generateChart}`,
      { query }
    );
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
