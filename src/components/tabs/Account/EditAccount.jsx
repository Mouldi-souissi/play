import React, { useRef } from "react";
import useGlobalStore from "../../../store";

const EditAccount = ({ account }) => {
  const editAccount = useGlobalStore((state) => state.editAccount);
  const refClose = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries());

    editAccount(account._id, values);
    refClose.current.click();
  };

  return (
    <div
      className="modal fade"
      id="editAccount"
      tabIndex="-1"
      aria-labelledby="editUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5 green" id="addSiteLabel">
              Editer le fond
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="form-group mb-3">
              <label className="mb-2 fw-semibold">Fond</label>
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="deposit"
                defaultValue={account.deposit}
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-seconday"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button type="submit" className="btn btn-primary">
              Sauveguarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
