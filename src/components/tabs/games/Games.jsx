import React from "react";
import { formatCurrency } from "../../../functions/formatCurrency";
import useGlobalStore from "../../../strore";
import AddGame from "./AddGame";

const Games = () => {
  const games = useGlobalStore((state) => state.games);
  const isLoading = useGlobalStore((state) => state.isLoading);
  return (
    <div className="container">
      <div className="d-flex align-items-baseline justify-content-center mb-5">
        <h4 className="me-3  sectionTitle">Jeux</h4>
        <button
          className="btn btn-outline-primary py-0 px-1"
          data-bs-toggle="modal"
          data-bs-target="#addGame"
        >
          <i className="bi bi-plus h3"></i>
        </button>
      </div>
      <div className="loader_wrapper">
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center ">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <div className="container">
        {games
          .sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          })
          .map((game) => (
            <div className="card m-3 customShadow">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={game.logo}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <h5 className="card-title mb-0">{game.name}</h5>
                      <button className="btn btn-transparent p-0">
                        <i
                          className="bi bi-gear "
                          data-bs-toggle="modal"
                          data-bs-target="#editUser"
                          // onClick={() => setUser(game)}
                        ></i>
                      </button>
                    </div>
                    {/* <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p> */}
                    <div className="fw-bold mb-2">Tarif</div>
                    {game.cost.map((c) => (
                      <div className="d-flex">
                        <div className="me-4">{c.duration} Min :</div>
                        <div className="green">{formatCurrency(c.cost)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <AddGame />
      {/* <EditUser game={game} /> */}
      {/* <DeleteUser game={deleteData} /> */}
    </div>
  );
};

export default Games;
