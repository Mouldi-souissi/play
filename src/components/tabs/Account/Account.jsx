import React from "react";
import useGlobalStore from "../../../store";

const cards = [
  { id: 1, title: "Fond", value: "1000", icon: "bi bi-safe" },
  { id: 2, title: "Total matchs", value: "100", icon: "bi bi-calculator" },
  {
    id: 3,
    title: "Meilleur vendeur",
    value: "Mouldi",
    icon: "bi bi-star-fill",
  },
  {
    id: 4,
    title: "Chiffre d'affaires",
    value: "3000",
    icon: "bi bi-graph-up-arrow",
  },
];

const Account = () => {
  const account = useGlobalStore((state) => state.account);
  return (
    <div className="container">
      <h4 className="mb-5 text-center sectionTitle">Caisse</h4>
      <div className="cards mt-5">
        {cards.map((card) => (
          <div key={card.id} className="account_card">
            <div className={`${card.icon} card_icon`}></div>
            <div className="card_right">
              <div className="card_title">{card.title}</div>
              <div className="card_value">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account;
