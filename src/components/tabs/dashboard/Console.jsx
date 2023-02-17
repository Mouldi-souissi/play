import React, { useState, useId } from "react";
import console from "../../../assets/console.png";
import useGlobalStore from "../../../strore";

const Console = ({ poste }) => {
  const games = useGlobalStore((state) => state.games);
  const [data, setData] = useState({ game: "FIFA", duration: "10" });
  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addRow = () => {
    setRows([...rows, { ...data, id: useId() }]);
  };

  return (
    <div
      className="modal fade"
      id="console"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header shadow-sm">
            <img src={console} width="50px" />
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {poste.name}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ fontSize: "10px" }}
            ></button>
          </div>
          <div className="modal-body">
            <button className="btn btn-primary mb-3">Activer la session</button>
            <div className="lead my-3 text-center">
              Ajouter les matchs joués
            </div>
            <div className="card p-4 shadow mb-4">
              <div className="d-flex flex-wrap">
                <div className="form-group me-4">
                  <label>Veuillez choisir un jeux</label>
                  <select
                    className="form-select"
                    onChange={handleChange}
                    name="game"
                  >
                    {games.map((game) => (
                      <option value={game.name} key={game.id}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group me-4">
                  <label>Veuillez choisir la durée</label>
                  <select
                    className="form-select"
                    onChange={handleChange}
                    name="duration"
                  >
                    <option value="10">10 Min</option>
                    <option value="15">15 Min</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Total des matchs</label>
                  <input
                    type="text"
                    className="form-control"
                    name="totalGames"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="btn btn-primary mt-4 ms-auto"
                  onClick={addRow}
                >
                  Ajouter <i className="fa fa-shopping-cart ms-2" />
                </button>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Jeux</th>
                  <th scope="col">Durée</th>
                  <th scope="col">Matches</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.game}</td>
                    <td>{row.duration}</td>
                    <td>{row.totalGames}</td>
                    <td>
                      <button className="btn btn-transparent m-0">
                        <i className="fa fa-trash-o text-danger " />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
            <button type="button" className="btn btn-primary">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Console;
