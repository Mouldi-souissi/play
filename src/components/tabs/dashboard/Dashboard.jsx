import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import console from "../../../assets/console.png";
import PosteDetails from "./PosteDetails";

const postes = [
  { name: "P1", isActive: false },
  { name: "P2", isActive: true },
  { name: "P3", isActive: false },
  { name: "P4", isActive: false },
  { name: "P5", isActive: false },
  { name: "P6", isActive: false },
];

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="dashboard">
      <h3 className="mb-5 text-center">Postes</h3>
      <div className="postes">
        {postes.map((poste) => (
          <div
            key={poste.name}
            className={`poste ${poste.isActive && "poste_active"}`}
            onClick={onOpen}
          >
            <img src={console} alt="consoleImg" className="consoleImg" />
            <div>{poste.name}</div>
          </div>
        ))}
      </div>

      <PosteDetails isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
};

export default Dashboard;
