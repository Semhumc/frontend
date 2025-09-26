import React, { useState } from "react";
import { Step1Preferences } from "./components/Step1Preferences";
import { Step2MealSelection } from "./components/Step2MealSelection";
import { Step3IngredientCheck } from "./components/Step3IngredientCheck";
import { Step4OnlineOrder } from "./components/Step4OnlineOrder";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState({
    calories: 2000,
    cuisine: "",
    allergies: "",
    favorites: "",
    cravings: "",
    notes: ""
  });
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [pantry, setPantry] = useState([]);
  const [missingIngredients, setMissingIngredients] = useState([]);

  const aiSuggestions = {
    starter: [
      { id: 1, name: "Mercimek Çorbası", calories: 180, ingredients: ["mercimek", "soğan", "su"] }
    ],
    main: [
      { id: 2, name: "Tavuk Şiş", calories: 320, ingredients: ["tavuk", "soğan", "biber"] }
    ]
  };

  return (
    <div className="app">
      {currentStep === 1 && <Step1Preferences preferences={preferences} setPreferences={setPreferences} />}
      {currentStep === 2 && <Step2MealSelection selectedMeals={selectedMeals} setSelectedMeals={setSelectedMeals} aiSuggestions={aiSuggestions} />}
      {currentStep === 3 && <Step3IngredientCheck selectedMeals={selectedMeals} pantry={pantry} setMissingIngredients={setMissingIngredients} />}
      {currentStep === 4 && <Step4OnlineOrder missingIngredients={missingIngredients} />}

      <div className="navigation">
        <button onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}>Önceki</button>
        <button onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}>Sonraki</button>
      </div>
    </div>
  );
};

export default App;
