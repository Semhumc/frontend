import React from "react";

export const Step1Preferences = ({ preferences, setPreferences }) => {
  const cuisineOptions = [
    { id: "turkish", label: "Türk Mutfağı", icon: "🇹🇷" },
    { id: "italian", label: "İtalyan", icon: "🇮🇹" },
    { id: "asian", label: "Asya", icon: "🥢" },
    { id: "mediterranean", label: "Akdeniz", icon: "🫒" }
  ];

  return (
    <div className="space-y-6">
      <h2>Tercihlerinizi Belirleyin</h2>
      <div>
        <label>Günlük Kalori Hedefi:</label>
        <input
          type="number"
          value={preferences.calories}
          onChange={(e) =>
            setPreferences({ ...preferences, calories: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <label>Mutfak Tercihi:</label>
        <div className="flex gap-2">
          {cuisineOptions.map((option) => (
            <button
              key={option.id}
              className={preferences.cuisine === option.id ? "selected" : ""}
              onClick={() => setPreferences({ ...preferences, cuisine: option.id })}
            >
              {option.icon} {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>Alerjileriniz:</label>
        <textarea
          value={preferences.allergies}
          onChange={(e) => setPreferences({ ...preferences, allergies: e.target.value })}
        />
      </div>

      <div>
        <label>Sevdiğiniz Yemekler:</label>
        <textarea
          value={preferences.favorites}
          onChange={(e) => setPreferences({ ...preferences, favorites: e.target.value })}
        />
      </div>

      <div>
        <label>Canınızın Çektiği:</label>
        <textarea
          value={preferences.cravings}
          onChange={(e) => setPreferences({ ...preferences, cravings: e.target.value })}
        />
      </div>

      <div>
        <label>Ek Notlar:</label>
        <textarea
          value={preferences.notes}
          onChange={(e) => setPreferences({ ...preferences, notes: e.target.value })}
        />
      </div>
    </div>
  );
};
