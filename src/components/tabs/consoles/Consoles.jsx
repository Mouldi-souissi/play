import React, { useEffect, useState } from "react";
import consoleLogo from "../../../assets/console.png";
import useGlobalStore from "../../../store";
import Console from "./Console";

const Consoles = () => {
  const [poste, setPost] = useState({
    _id: "",
    name: "",
    isActive: false,
    games: [],
    session: { start: "", end: "" },
  });
  const consoles = useGlobalStore((state) => state.consoles);
  const getStations = useGlobalStore((state) => state.getStations);
  const getGames = useGlobalStore((state) => state.getGames);
  const games = useGlobalStore((state) => state.games);

  const handlePosteClick = (poste) => {
    setPost(poste);
  };

  useEffect(() => {
    if (!consoles.length) {
      getStations();
    }
  }, []);

  useEffect(() => {
    if (!games.length) {
      getGames();
    }
  }, []);

  useEffect(() => {
    if (poste.name) {
      const match = consoles.find((c) => c._id === poste._id);
      setPost(match);
    }
  }, [consoles]);

  return (
    <div className="dashboard">
      <h4 className="mb-5 text-center sectionTitle">Postes</h4>
      <div className="postes">
        {consoles
          .sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
          .map((poste) => (
            <div
              key={poste._id}
              className={`poste ${poste.isActive && "poste_active"}`}
              onClick={() => handlePosteClick(poste)}
              data-bs-toggle="modal"
              data-bs-target="#console"
            >
              <img src={consoleLogo} alt="consoleImg" className="consoleImg" />
              <div className="consoleText">{poste.name}</div>
            </div>
          ))}
      </div>
      <Console poste={poste} />
    </div>
  );
};

export default Consoles;
