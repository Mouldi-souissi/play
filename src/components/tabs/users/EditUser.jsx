import React, { useEffect, useRef, useState } from "react";
import useGlobalStore from "../../../store";
import CustomSelect from "../../CustomSelect";

const EditUser = ({ user }) => {
  const [data, setData] = useState({ name: "", type: "" });
  const editUser = useGlobalStore((state) => state.editUser);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(data);
    refClose.current.click();
  };

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

  return (
    <div
      className="modal fade"
      id="editUser"
      tabIndex="-1"
      aria-labelledby="editUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5 green" id="addSiteLabel">
              Editer l'utilisateur
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
                value={data.name}
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
              className="btn btn-seconday"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button type="submit" className="btn btn-primary">
              Sauvgarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
