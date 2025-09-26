import React, { useState, useEffect } from "react";
import { getMissingIngredients } from "../services/api";

export const Step3IngredientCheck = ({ selectedMeals, pantry, setMissingIngredients }) => {
  const [mealPlan, setMealPlan] = useState({});

  useEffect(() => {
    const fetchMissing = async () => {
      const aiResponse = { ...selectedMeals }; // Backend’e AI cevabı olarak gönderiyoruz
      const data = await getMissingIngredients(aiResponse, pantry);
      if (data) {
        setMissingIngredients(data.missing_ingredients);
        setMealPlan(data.meal_plan);
      }
    };

    if (selectedMeals.length > 0) fetchMissing();
  }, [selectedMeals, pantry, setMissingIngredients]);

  return (
    <div>
      <h2>Malzeme Kontrolü</h2>

      {selectedMeals.map((meal) => (
        <div key={meal.id}>
          <h3>{meal.name}</h3>
          <div>
            {meal.ingredients.map((ing) => (
              <label key={ing}>
                <input type="checkbox" checked={pantry.includes(ing)} readOnly />
                {ing}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
