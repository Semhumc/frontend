import React from "react";

export const Step2MealSelection = ({ selectedMeals, setSelectedMeals, aiSuggestions }) => {
  const handleMealSelect = (meal) => {
    const exists = selectedMeals.find((m) => m.id === meal.id);
    if (exists) {
      setSelectedMeals(selectedMeals.filter((m) => m.id !== meal.id));
    } else {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };

  const renderMealCard = (meal) => (
    <div
      key={meal.id}
      className={`meal-card ${selectedMeals.find((m) => m.id === meal.id) ? "selected" : ""}`}
      onClick={() => handleMealSelect(meal)}
    >
      <h3>{meal.name}</h3>
      <p>{meal.calories} kcal</p>
      <p>Malzemeler: {meal.ingredients.join(", ")}</p>
    </div>
  );

  return (
    <div>
      <h2>AI Yemek Önerileri</h2>

      {Object.keys(aiSuggestions).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <div className="grid gap-2">
            {aiSuggestions[category].map((meal) => renderMealCard(meal))}
          </div>
        </div>
      ))}

      <div>
        <h4>Seçilen Yemekler:</h4>
        {selectedMeals.map((m) => (
          <span key={m.id}>{m.name}</span>
        ))}
      </div>
    </div>
  );
};
