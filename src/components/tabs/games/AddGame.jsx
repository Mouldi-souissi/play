import React, { useRef, useState } from "react";
import useGlobalStore from "../../../strore";
import CustomSelect from "../../CustomSelect";

const AddGame = () => {
  const [data, setData] = useState({ type: "utilisateur" });
  const addGame = useGlobalStore((state) => state.addGame);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(data);
    refClose.current.click();
  };

  const handleTariffType = (name, value) => {
    console.log({ name, value });
  };
  return (
    <div className="modal fade" id="addGame" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Ajouter un nouveau jeu</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-floating mb-3 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom"
                      name="name"
                      onChange={handleInput}
                      required
                      autoComplete="off"
                    />
                    <label>Nom</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom"
                      name="logo"
                      onChange={handleInput}
                    />
                    <label>Logo</label>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center p-4">
                <div className="fw-bold me-3">Tarif</div>
                <button className="btn btn-outline-primary py-0 px-1">
                  <i className="bi bi-plus h3"></i>
                </button>
              </div>
              <div className="p-4">
                <label className="mb-2">Mode de paiement</label>
                <CustomSelect
                  options={["Par heure", "Par match"]}
                  getSelected={handleTariffType}
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  name="logo"
                  onChange={handleInput}
                />
                <label>Logo</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Fermer
              </button>
              <button type="submit" className="btn btn-primary">
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGame;
