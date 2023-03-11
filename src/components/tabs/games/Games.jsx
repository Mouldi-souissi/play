import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../functions/formatCurrency";
import useGlobalStore from "../../../store";
import AddGame from "./AddGame";
import DeleteGame from "./DeleteGame";
import EditGame from "./EditGame";

const Games = () => {
  const games = useGlobalStore((state) => state.games);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const getGames = useGlobalStore((state) => state.getGames);
  const [game, setGame] = useState({ name: "" });

  useEffect(() => {
    getGames();
  }, []);
  return (
    <div className="container">
      <div className="d-flex align-items-baseline justify-content-center mb-5">
        <h4 className="me-3  sectionTitle">Jeux</h4>
        <button
          className="btn btn-outline-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#addGame"
        >
          <i className="bi bi-plus h4"></i>
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
        <div className="row justify-content-center">
          {games
            .sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            })
            .map((game) => (
              <div key={game._id} className="game">
                <div className="d-flex justify-content-between align-items-center game-header p-3">
                  <h5 className="mb-0">{game.name}</h5>
                  <div className="d-flex">
                    <button
                      className="btn btn-transparent btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#editGame"
                      onClick={() => setGame(game)}
                    >
                      <i className="bi bi-gear"></i>
                    </button>
                    <button
                      className="btn btn-transparent btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteGame"
                      onClick={() => setGame(game)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
                <div className="game-body p-3">
                  <div className="fw-bolder mb-2 tarif">Tarif</div>
                  {game.prices.map((p) => (
                    <div key={p.id} className="d-flex justify-content-between">
                      <div className="me-4">{p.duration} :</div>
                      <div className="fw-semibold">
                        {formatCurrency(p.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <AddGame />
      <EditGame game={game} />
      <DeleteGame game={game} />
    </div>
  );
};

export default Games;
