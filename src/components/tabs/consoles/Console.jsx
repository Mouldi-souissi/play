import React, { useEffect, useRef, useState } from "react";
import consoleLogo from "../../../assets/console.png";
import useGlobalStore from "../../../store";
import { generateUUID } from "../../../functions/generateUUID";
import { formatCurrency } from "../../../functions/formatCurrency";
import CustomSelect from "../../CustomSelect";

const Console = ({ poste }) => {
  const games = useGlobalStore((state) => state.games);
  const addGameToSession = useGlobalStore((state) => state.addGameToSession);
  const deleteGameFromSession = useGlobalStore(
    (state) => state.deleteGameFromSession
  );
  const toggleConsoleActivity = useGlobalStore(
    (state) => state.toggleConsoleActivity
  );
  const addSession = useGlobalStore((state) => state.addSession);
  const refClose = useRef();

  const [data, setData] = useState({ game: "", duration: "10 Min" });
  const [msg, setMsg] = useState("");

  const total = poste.games.reduce((acc, cur) => (acc += cur.total), 0);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getValues = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const addRow = (e) => {
    e.preventDefault();
    const total = calculateTotalRow(data);
    if (total) {
      addGameToSession(poste, {
        ...data,
        id: generateUUID(),
        total,
      });
    } else {
      setMsg("Pas de tarif");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  };

  const deleteRow = (id) => {
    deleteGameFromSession(poste, id);
  };

  const calculateTotalRow = (row) => {
    const match = games.find((game) => game.name === row.game);

    const cost = match["prices"].find((c) => c.duration === row.duration);
    if (match && cost) {
      return cost["price"] * Number(row.totalGames);
    } else {
      return 0;
    }
  };

  const activateSession = (id) => {
    toggleConsoleActivity(id, poste.isActive);
  };

  const handleSubmit = () => {
    const session = {
      games: poste.games,
      start: poste.session.start,
      station: { name: poste.name, id: poste._id },
      total,
    };
    addSession(session);
    refClose.current.click();
  };

  const gameOptions = games.map((g) => g.name);

  useEffect(() => {
    if (games.length) {
      setData({ ...data, game: games[0].name });
    }
  }, [games]);

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
            <img src={consoleLogo} width="50px" className="consoleImgSm me-3" />
            <h1 className="modal-title fs-5 fw-bold black">{poste.name}</h1>

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

            <div className="fw-bolder my-3 text-center">
              Ajouter les matchs joués
            </div>

            <form className="card p-4 mb-4 shadow-sm" onSubmit={addRow}>
              <div className="d-flex flex-wrap align-items-end">
                <div className="form-group me-4">
                  <label className="my-2 fw-semibold">
                    Veuillez choisir un jeux
                  </label>
                  <CustomSelect
                    options={gameOptions}
                    getSelected={getValues}
                    name="game"
                    defaultSelectedOption={data.game}
                  />
                </div>
                <div className="form-group me-4">
                  <label className="my-2 fw-semibold">
                    Veuillez choisir la durée
                  </label>
                  <CustomSelect
                    options={["10 Min", "15 Min", "1 h"]}
                    getSelected={getValues}
                    name="duration"
                    defaultSelectedOption={data.duration}
                  />
                </div>
                <div className="form-group">
                  <label className="my-2 fw-semibold">Total des matchs</label>
                  <input
                    type="text"
                    className="form-control"
                    name="totalGames"
                    onChange={handleChange}
                    required={true}
                    placeholder="0"
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
              {msg && <div className="text-center red">{msg}</div>}
            </form>
            <div className="table-responsive mb-2">
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
                          className="btn btn-transparent btn-sm"
                          onClick={() => deleteRow(row.id)}
                        >
                          <i className="bi bi-trash3 red" />
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
              >
                Fermer
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!poste.isActive || !poste.games.length}
                onClick={handleSubmit}
              >
                Encaisser
                <i className="fa fa-credit-card-alt ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Console;
