import React from "react";
import console from "../../../assets/console.png";
import useGlobalStore from "../../../strore";

const Console = ({ poste }) => {
  const games = useGlobalStore((state) => state.games);

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
                <tr>
                  <td>
                    <div className="form-group">
                      <label>Veuillez choisir un jeux</label>
                      <select className="form-select">
                        {games.map((game) => (
                          <option value={game.name} key={game.id}>
                            {game.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td>
                    <div className="form-group">
                      <label>Veuillez choisir la durée</label>
                      <select className="form-select">
                        <option value="10">10 Min</option>
                        <option value="15">15 Min</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <label>Matches</label>
                      <input type="text" className="form-control" />
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-primary mt-4">Ajouter</button>
                  </td>
                </tr>
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
