import React, { useRef, useState } from "react";
import { generateUUID } from "../../../functions/generateUUID";
import useGlobalStore from "../../../strore";
import CustomSelect from "../../CustomSelect";

const AddGame = () => {
  const [data, setData] = useState({ name: "", logo: "", prices: [] });
  const [tariff, setTariff] = useState("");
  const addGame = useGlobalStore((state) => state.addGame);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGame(data);
    refClose.current.click();
  };

  const handleTariff = (name, value) => {
    setTariff({ ...tariff, [name]: value });
  };

  const addTarif = () => {
    setData({
      ...data,
      prices: [...data.prices, { ...tariff, id: generateUUID() }],
    });
  };

  const handlePrice = (e) => {
    setTariff({ ...tariff, [e.target.name]: e.target.value });
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
                  <div className="mb-3">
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
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Logo"
                      name="logo"
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="d-flex align-items-center mb-2">
                  <div className="fw-bold">Tarif</div>
                </div>
                <div className="d-flex align-items-end">
                  <div className="me-3">
                    <label className="mb-2">Durée</label>
                    <CustomSelect
                      options={["10 Min", "15 Min", "1 h"]}
                      getSelected={handleTariff}
                      name="duration"
                    />
                  </div>

                  <div>
                    <label className="mb-2">Prix</label>
                    <div className="me-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Prix"
                        name="price"
                        onChange={handlePrice}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-primary py-1"
                    type="button"
                    onClick={addTarif}
                  >
                    <i className="bi bi-plus h3"></i>
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Durée</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.prices?.map((el) => (
                      <tr key={el.id}>
                        <td>{el.duration}</td>
                        <td>{el.price}</td>
                        <td>
                          <button className="btn btn-transparent p-0">
                            <i
                              className="bi bi-trash3 red"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteUser"
                              // onClick={() => setDeleteData(session)}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
