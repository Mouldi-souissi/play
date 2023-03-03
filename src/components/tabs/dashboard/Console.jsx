import React, { useEffect, useRef, useState } from "react";
import consoleLogo from "../../../assets/console.png";
import useGlobalStore from "../../../strore";
import { generateUUID } from "../../../functions/generateUUID";
import { formatCurrency } from "../../../functions/formatCurrency";
import CustomSelect from "../../CustomSelect";

const Console = ({ poste }) => {
  const games = useGlobalStore((state) => state.games);
  const getGames = useGlobalStore((state) => state.getGames);
  const addGameToSession = useGlobalStore((state) => state.addGameToSession);
  const deleteGameFromSession = useGlobalStore(
    (state) => state.deleteGameFromSession
  );
  const toggleConsoleActivity = useGlobalStore(
    (state) => state.toggleConsoleActivity
  );
  const addSession = useGlobalStore((state) => state.addSession);
  const refClose = useRef();

  const [data, setData] = useState({ game: "FIFA", duration: "10 Min" });

  const total = poste.games.reduce((acc, cur) => (acc += cur.total), 0);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getValues = (name, value) => {
    setData({ ...data, [name]: value });
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
    console.log(match);
    const cost = match["prices"].find((c) => c.duration === row.duration);

    return cost["price"] * Number(row.totalGames);
  };

  const activateSession = (id) => {
    toggleConsoleActivity(id, poste.isActive);
  };

  const handleClose = () => {
    console.log("closed modal");
  };

  const handleCheckout = () => {
    const session = {
      games: poste.games,
      start: poste.session.start,
      station: { name: poste.name, id: poste._id },
      total,
    };
    addSession(session);
    refClose.current.click();
  };

  useEffect(() => {
    getGames();
  }, []);

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
            <form className="card p-4 mb-4 shadow-sm" onSubmit={addRow}>
              <div className="d-flex flex-wrap align-items-end">
                <div className="form-group me-4">
                  <label className="my-2">Veuillez choisir un jeux</label>
                  <CustomSelect
                    options={games.map((g) => g.name)}
                    getSelected={getValues}
                    name="game"
                  />
                  {/* <select
                    className="form-select"
                    onChange={handleChange}
                    name="game"
                  >
                    {games.map((game) => (
                      <option value={game.name} key={game.id}>
                        {game.name}
                      </option>
                    ))}
                  </select> */}
                </div>
                <div className="form-group me-4">
                  <label className="my-2">Veuillez choisir la durée</label>
                  <CustomSelect
                    options={["10 Min", "15 Min"]}
                    getSelected={getValues}
                    name="duration"
                  />
                  {/* <select
                    className="form-select"
                    onChange={handleChange}
                    name="duration"
                  >
                    <option value="10">10 Min</option>
                    <option value="15">15 Min</option>
                  </select> */}
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
                  <td className="fw-bold">Total</td>
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
              className="btn btn-transparent"
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
              onClick={handleCheckout}
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
