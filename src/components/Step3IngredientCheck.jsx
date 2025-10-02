import React, { useState, useEffect } from "react";
import { getMissingIngredients } from "../services/api";

export const Step3IngredientCheck = ({ selectedMeals, pantry, setPantry, setMissingIngredients }) => {
  const [mealPlan, setMealPlan] = useState({});

  // Eksik malzemeleri backend'den çek
  useEffect(() => {
    const fetchMissing = async () => {
      const aiResponse = { ...selectedMeals };
      const data = await getMissingIngredients(aiResponse, pantry);
      if (data) {
        setMissingIngredients(data.missing_ingredients);
        setMealPlan(data.meal_plan);
      }
    };

    if (selectedMeals.length > 0) fetchMissing();
  }, [selectedMeals, pantry, setMissingIngredients]);

  // Checkbox tıklanınca pantry güncelle
  const handleIngredientToggle = (ingredient) => {
    if (pantry.includes(ingredient)) {
      setPantry(pantry.filter((item) => item !== ingredient));
    } else {
      setPantry([...pantry, ingredient]);
    }
  };

  return (
    <div>
      <h2>Malzeme Kontrolü</h2>

      {selectedMeals.map((meal) => (
        <div key={meal.id}>
          <h3>{meal.name}</h3>
          <div>
            {meal.ingredients.map((ing) => (
              <label key={ing} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={pantry.includes(ing)}
                  onChange={() => handleIngredientToggle(ing)}
                />
                {ing}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
