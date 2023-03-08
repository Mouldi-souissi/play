import React, { useEffect } from "react";
import useGlobalStore from "../../../store";

const cards = [
  {
    id: 3,
    title: "Meilleur vendeur",
    value: "Mouldi",
    icon: "bi bi-star-fill",
  },
];

const Account = () => {
  const account = useGlobalStore((state) => state.account);
  const getAccount = useGlobalStore((state) => state.getAccount);

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className="container">
      <h4 className="mb-5 text-center sectionTitle">Caisse</h4>
      <div className="cards mt-5">
        <div className="account_card">
          <i className="bi bi-safe card_icon" />
          <div className="card_right">
            <div className="card_title">Fond</div>
            <div className="card_value">{account.deposit}</div>
          </div>
        </div>
        <div className="account_card">
          <i className="bi bi-calculator card_icon" />
          <div className="card_right">
            <div className="card_title">Total matchs</div>
            <div className="card_value">{account.totalGames}</div>
          </div>
        </div>
        <div className="account_card">
          <i className="bi bi-graph-up-arrow card_icon" />
          <div className="card_right">
            <div className="card_title">Chiffre d'affaires</div>
            <div className="card_value">{account.gain}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
