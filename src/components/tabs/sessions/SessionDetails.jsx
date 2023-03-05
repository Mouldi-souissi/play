import React from "react";
import { formatCurrency } from "../../../functions/formatCurrency";

const SessionDetails = ({ session }) => {
  return (
    <div
      className="modal fade"
      id="sessionDetails"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 green">Détails</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <ol className="list-group ">
              {session.games.map((game) => (
                <li
                  key={game.id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    <span> {game.game}</span>
                    <span> x {game.totalGames}</span>
                  </span>
                  <span> {formatCurrency(game.total)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
