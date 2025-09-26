import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// AI'dan yemek önerileri almak için
export const getMealSuggestions = async (preferences) => {
  try {
    const res = await axios.post(`${BASE_URL}/meals/`, {
      preferences: preferences
    });
    return res.data;
  } catch (err) {
    console.error("Meal Suggestions API Error:", err);
    return null;
  }
};

// Eksik malzemeleri almak için
export const getMissingIngredients = async (aiResponse, pantry=[]) => {
  try {
    const res = await axios.post(`${BASE_URL}/ingredients/missing`, {
      ai_response: JSON.stringify(aiResponse),
      pantry: pantry
    });
    return res.data;
  } catch (err) {
    console.error("Missing Ingredients API Error:", err);
    return null;
  }
};