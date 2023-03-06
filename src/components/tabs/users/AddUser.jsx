import React, { useRef, useState } from "react";
import useGlobalStore from "../../../store";
import CustomSelect from "../../CustomSelect";

const AddUser = () => {
  const [data, setData] = useState({ type: "utilisateur" });
  const addUser = useGlobalStore((state) => state.addUser);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(data);
    refClose.current.click();
  };
  return (
    <div className="modal fade" id="addUser" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 green">
                Ajouter un nouveau utilisateur
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
                <label className="mb-2 fw-semibold">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  name="name"
                  onChange={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group mb-3">
                <label className="mb-2 fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="mb-2 fw-semibold">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={handleInput}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 fw-semibold">Type</label>
                <CustomSelect
                  options={["admin", "utilisateur"]}
                  getSelected={(name, value) => {
                    setData({ ...data, type: value });
                  }}
                  name="type"
                  defaultSelectedOption={data.type}
                />
              </div>
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

export default AddUser;
