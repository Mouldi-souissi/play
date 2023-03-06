import React, { useRef } from "react";
import useGlobalStore from "../../../store";

const DeleteGame = ({ game }) => {
  const deleteGame = useGlobalStore((state) => state.deleteGame);
  const refClose = useRef();

  const handleDelete = () => {
    deleteGame(game._id);
    refClose.current.click();
  };

  return (
    <div
      className="modal fade"
      id="deleteGame"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5"></h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <span className="me-1">Veillez confirmer la supression du jeu</span>
            <span className="fw-semibold">{game.name}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-transparent"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteGame;
