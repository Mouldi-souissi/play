import React, { useEffect, lazy, Suspense } from "react";
import { formatCurrency } from "../../../functions/formatCurrency";
import useGlobalStore from "../../../store";

const LazyEditAccount = lazy(() => import("./EditAccount"));

const Account = () => {
  const account = useGlobalStore((state) => state.account);
  const getAccount = useGlobalStore((state) => state.getAccount);
  const userType = useGlobalStore((state) => state.userType);

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center mb-5 mt-3">
        <h4 className="me-3 my-0 sectionTitle">Caisse</h4>
        {userType === "admin" && (
          <button
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#editAccount"
          >
            Editer
          </button>
        )}
      </div>

      <div className="cards mt-5">
        <div className="account_card">
          <i className="bi bi-safe card_icon" />
          <div className="card_right">
            <div className="card_title">Fond</div>
            <div className="card_value">{formatCurrency(account.deposit)}</div>
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
            <div className="card_value">{formatCurrency(account.gain)}</div>
          </div>
        </div>
      </div>
      <Suspense>
        <LazyEditAccount account={account} />
      </Suspense>
    </div>
  );
};

export default Account;
