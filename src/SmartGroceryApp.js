import React, { useState } from 'react';
import { ChefHat, Check } from 'lucide-react';

const SmartGroceryApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState({ calories: 2000, cuisine: '' });
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState(new Set());

  const aiSuggestions = {
    starter: [
      { id: 1, name: "Mercimek Çorbası", calories: 180, ingredients: ["kırmızı mercimek", "soğan", "havuç", "tereyağı", "un", "tavuk suyu"] },
      { id: 2, name: "Ezogelin Çorbası", calories: 160, ingredients: ["kırmızı mercimek", "bulgur", "domates salçası", "soğan", "nane", "kırmızı biber"] }
    ],
    main: [
      { id: 3, name: "Tavuk Şiş", calories: 320, ingredients: ["tavuk göğsü", "soğan", "biber", "domates", "zeytinyağı", "baharat"] },
      { id: 4, name: "Karnıyarık", calories: 280, ingredients: ["patlıcan", "kıyma", "soğan", "domates", "biber", "maydanoz"] }
    ]
    // side ve dessert eklenebilir
  };

  const cuisineOptions = [
    { id: 'turkish', label: 'Türk Mutfağı', icon: '🇹🇷' },
    { id: 'italian', label: 'İtalyan', icon: '🇮🇹' },
  ];

  const handleMealSelect = (meal) => {
    setSelectedMeals(prev => {
      if(prev.find(m=>m.id===meal.id)) return prev.filter(m=>m.id!==meal.id);
      return [...prev, meal];
    });
  };

  const toggleIngredient = (ingredient) => {
    setAvailableIngredients(prev => {
      const newSet = new Set(prev);
      if(newSet.has(ingredient)) newSet.delete(ingredient);
      else newSet.add(ingredient);
      return newSet;
    });
  };

  const getAllIngredients = () => {
    const all = new Set();
    selectedMeals.forEach(meal => meal.ingredients.forEach(i=>all.add(i)));
    return Array.from(all);
  };

  const getMissingIngredients = () => getAllIngredients().filter(i => !availableIngredients.has(i));

  const nextStep = () => { if(currentStep<4) setCurrentStep(prev=>prev+1); };
  const prevStep = () => { if(currentStep>1) setCurrentStep(prev=>prev-1); };
  const isNextDisabled = () => {
    if(currentStep===1) return !preferences.cuisine;
    if(currentStep===2) return selectedMeals.length===0;
    if(currentStep===3) return getAllIngredients().length===0;
    return false;
  };

  const renderStep1 = () => (
    <div>
      <h2>Adım 1: Tercihlerinizi Belirleyin</h2>
      <div>
        <span>Kalori: {preferences.calories}</span>
        <button onClick={()=>setPreferences({...preferences, calories:preferences.calories-100})}>-</button>
        <button onClick={()=>setPreferences({...preferences, calories:preferences.calories+100})}>+</button>
      </div>
      <div>
        {cuisineOptions.map(c=>(
          <button key={c.id} onClick={()=>setPreferences({...preferences, cuisine:c.id})}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2>Adım 2: Yemek Seçimi</h2>
      {Object.keys(aiSuggestions).map(cat=>(
        <div key={cat}>
          <h3>{cat}</h3>
          {aiSuggestions[cat].map(meal=>(
            <div key={meal.id} onClick={()=>handleMealSelect(meal)} style={{border:selectedMeals.find(m=>m.id===meal.id)?'2px solid green':'1px solid gray'}}>
              <div>{meal.name} ({meal.calories} kcal)</div>
              <div>{meal.ingredients.join(', ')}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2>Adım 3: Malzeme Kontrolü</h2>
      {selectedMeals.map(meal=>(
        <div key={meal.id}>
          <div>{meal.name}</div>
          {meal.ingredients.map(ing=>(
            <label key={ing}>
              <input type="checkbox" checked={availableIngredients.has(ing)} onChange={()=>toggleIngredient(ing)} />
              {ing}
            </label>
          ))}
        </div>
      ))}
      <div>Eksik Malzemeler: {getMissingIngredients().join(', ')}</div>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <h2>Adım 4: Online Market Siparişi</h2>
      <div>Eksik Malzemeler: {getMissingIngredients().join(', ')}</div>
      <button>Sepete Ekle</button>
    </div>
  );

  const renderCurrentStep = () => {
    if(currentStep===1) return renderStep1();
    if(currentStep===2) return renderStep2();
    if(currentStep===3) return renderStep3();
    if(currentStep===4) return renderStep4();
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <ChefHat size={48} className="text-blue-600" />
        <h1>Akıllı Market Asistanı</h1>
      </div>
      <div>{renderCurrentStep()}</div>
      <div className="flex justify-between mt-4">
        <button onClick={prevStep} disabled={currentStep===1}>Geri</button>
        <button onClick={nextStep} disabled={isNextDisabled()}>İleri</button>
      </div>
    </div>
  );
};

export default SmartGroceryApp;
