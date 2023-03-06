import React, { useRef, useState } from "react";
import { generateUUID } from "../../../functions/generateUUID";
import useGlobalStore from "../../../store";
import CustomSelect from "../../CustomSelect";

const AddGame = () => {
  const [data, setData] = useState({ name: "", prices: [] });
  const [tariff, setTariff] = useState({ duration: "10 Min", price: 0 });
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

  const addTarif = (e) => {
    e.preventDefault();
    setData({
      ...data,
      prices: [...data.prices, { ...tariff, id: generateUUID() }],
    });
  };

  const deleteTarif = (id) => {
    setData({
      ...data,
      prices: data.prices.filter((p) => p.id !== id),
    });
  };

  const handlePrice = (e) => {
    setTariff({ ...tariff, [e.target.name]: e.target.value });
  };
  return (
    <div className="modal fade" id="addGame" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 green">Ajouter un nouveau jeu</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="fw-semibold mb-2">Nom</label>
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
            <div className="fw-semibold mb-2">Tarif</div>
            <form className="card p-4 mb-4 shadow-sm" onSubmit={addTarif}>
              <div className="d-flex align-items-end justify-content-between">
                <div className="d-flex">
                  <div className="me-3">
                    <label className="mb-2">Durée</label>
                    <CustomSelect
                      options={["10 Min", "15 Min", "1 h"]}
                      getSelected={handleTariff}
                      name="duration"
                      defaultSelectedOption={tariff.duration}
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
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-outline-primary py-1"
                  type="submit"
                  disabled={!data.name}
                >
                  <i className="bi bi-plus h3"></i>
                </button>
              </div>
            </form>
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
                  {data.prices?.map((p) => (
                    <tr key={p.id}>
                      <td>{p.duration}</td>
                      <td>{p.price}</td>
                      <td>
                        <button
                          className="btn btn-transparent btn-sm"
                          type="button"
                        >
                          <i
                            className="bi bi-trash3 red"
                            onClick={() => deleteTarif(p.id)}
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
              className="btn btn-transparent"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!data.name || !data.prices.length}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGame;
