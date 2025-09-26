import React from "react";

export const Step4OnlineOrder = ({ missingIngredients }) => {
  return (
    <div>
      <h2>Online Market Siparişi</h2>

      <div>
        <h3>Getir</h3>
        <ul>
          {missingIngredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button>Getir’de Sepete Ekle</button>
      </div>

      <div>
        <h3>Migros</h3>
        <ul>
          {missingIngredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button>Migros’ta Sepete Ekle</button>
      </div>
    </div>
  );
};
