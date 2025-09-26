import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getMissingIngredients = async (aiResponse, pantry=[]) => {
  try {
    const res = await axios.post(`${BASE_URL}/ingredients/missing`, {
      ai_response: JSON.stringify(aiResponse),
      pantry: pantry
    });
    return res.data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
};
