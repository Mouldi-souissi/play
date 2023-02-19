import React, { useEffect, useState } from "react";
import consoleLogo from "../../../assets/console.png";
import useGlobalStore from "../../../strore";
import Console from "./Console";

const Dashboard = () => {
  const [poste, setPost] = useState("");
  const consoles = useGlobalStore((state) => state.consoles);

  const handlePosteClick = (poste) => {
    setPost(poste);
  };

  useEffect(() => {
    if (poste) {
      const match = consoles.find((c) => c.id === poste.id);
      setPost(match);
    }
  }, [consoles]);

  return (
    <div className="dashboard">
      <h4 className="mb-5 text-center sectionTitle">Postes</h4>
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
              <img src={consoleLogo} alt="consoleImg" className="consoleImg" />
              <div className="consoleText">{poste.name}</div>
            </div>
          ))}
      </div>
      <Console poste={poste} />
    </div>
  );
};

export default Dashboard;
