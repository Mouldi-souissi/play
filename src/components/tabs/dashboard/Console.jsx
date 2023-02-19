import React, { useEffect, useRef, useState } from "react";
import consoleLogo from "../../../assets/console.png";
import useGlobalStore from "../../../strore";
import { generateUUID } from "../../../functions/generateUUID";
import { formatCurrency } from "../../../functions/formatCurrency";

const Console = ({ poste }) => {
  const games = useGlobalStore((state) => state.games);
  const addGameToSession = useGlobalStore((state) => state.addGameToSession);
  const deleteGameFromSession = useGlobalStore(
    (state) => state.deleteGameFromSession
  );
  const toggleConsoleActivity = useGlobalStore(
    (state) => state.toggleConsoleActivity
  );
  const refClose = useRef();

  const [data, setData] = useState({ game: "FIFA", duration: "10" });

  const total = poste.games.reduce((acc, cur) => (acc += cur.total), 0);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addRow = (e) => {
    e.preventDefault();
    addGameToSession(poste, {
      ...data,
      id: generateUUID(),
      total: calculateTotalRow(data),
    });
  };

  const deleteRow = (id) => {
    deleteGameFromSession(poste, id);
  };

  const calculateTotalRow = (row) => {
    const match = games.find((game) => game.name === row.game);
    const cost = match["cost"].find((c) => c.duration === Number(row.duration));

    return cost["cost"] * Number(row.totalGames);
  };

  const activateSession = (id) => {
    toggleConsoleActivity(id, poste.isActive);
  };

  const handleClose = () => {
    console.log("closed modal");
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
            <img src={consoleLogo} width="50px" />
            <h1 className="modal-title fs-5">{poste.name}</h1>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ fontSize: "10px" }}
            ></button>
          </div>
          <div className="modal-body">
            {poste.isActive && (
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-secondary "
                  onClick={() => activateSession(poste._id)}
                >
                  Désactiver la session
                  <i className="bi bi-stop-fill ms-2"></i>
                </button>
                <div>
                  <div>
                    <span>Début : </span>
                    <span className="green">
                      {new Date(poste.session.start).toLocaleTimeString("fr", {
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {!poste.isActive && (
              <button
                className="btn btn-primary "
                onClick={() => activateSession(poste._id)}
              >
                Activer la session
                <i className="bi bi-play-fill ms-2"></i>
              </button>
            )}

            <div className="h6 my-3 text-center">Ajouter les matchs joués</div>
            <form className="card p-4 shadow-sm mb-4" onSubmit={addRow}>
              <div className="d-flex flex-wrap align-items-end">
                <div className="form-group me-4">
                  <label className="my-2">Veuillez choisir un jeux</label>
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
                  <label className="my-2">Veuillez choisir la durée</label>
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
                  <label className="my-2">Total des matchs</label>
                  <input
                    type="text"
                    className="form-control"
                    name="totalGames"
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <button
                  className="btn btn-primary mt-4 ms-auto"
                  disabled={!poste.isActive}
                  type="sumbit"
                >
                  Ajouter <i className="fa fa-shopping-cart ms-2" />
                </button>
              </div>
            </form>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Jeux</th>
                  <th scope="col">Durée</th>
                  <th scope="col">Matches</th>
                  <th scope="col">Action</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {poste.games.map((row) => (
                  <tr key={row.id}>
                    <td>{row.game}</td>
                    <td>{row.duration}</td>
                    <td>{row.totalGames}</td>
                    <td>
                      <button
                        className="btn btn-transparent m-0"
                        onClick={() => deleteRow(row.id)}
                      >
                        <i className="bi-trash3 red" />
                      </button>
                    </td>
                    <td>{formatCurrency(row.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-dark">
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="fw-bold">{formatCurrency(total)}</div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={refClose}
              onClick={handleClose}
            >
              Fermer
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!poste.isActive || !poste.games.length}
            >
              Encaisser
              <i className="fa fa-credit-card-alt ms-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Console;
