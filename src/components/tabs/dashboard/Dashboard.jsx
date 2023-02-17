import React, { useState } from "react";
import console from "../../../assets/console.png";
import useGlobalStore from "../../../strore";
import Console from "./Console";

const Dashboard = () => {
  const [poste, setPost] = useState("");
  const consoles = useGlobalStore((state) => state.consoles);

  const handlePosteClick = (poste) => {
    setPost(poste);
  };
  return (
    <div className="dashboard">
      <h3 className="mb-5 text-center">Postes</h3>
      <div className="postes">
        {consoles
          .sort((a, b) => a.id - b.id)
          .map((poste) => (
            <div
              key={poste.name}
              className={`poste ${poste.isActive && "poste_active"}`}
              onClick={() => handlePosteClick(poste)}
              data-bs-toggle="modal"
              data-bs-target="#console"
            >
              <img src={console} alt="consoleImg" className="consoleImg" />
              <div>{poste.name}</div>
            </div>
          ))}
      </div>
      <Console poste={poste} />
    </div>
  );
};

export default Dashboard;
