import React, { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../../functions/formatCurrency";
import useGlobalStore from "../../../strore";

const Sessions = () => {
  const sessions = useGlobalStore((state) => state.sessions);
  const getSessions = useGlobalStore((state) => state.getSessions);
  const [isSelecting, toggleMenu] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelection = (id) => {
    setSelected(id);
    toggleMenu(false);
  };

  const outsideRef = useRef();

  const handleClickOutside = (e) => {
    if (outsideRef.current && outsideRef.current.contains(e.target)) {
      toggleMenu(false);
    }
  };

  useEffect(() => {
    getSessions();
    // document.addEventListener("click", handleClickOutside, true);
    // return () => {
    //   document.removeEventListener("click", handleClickOutside, true);
    // };
  }, []);
  return (
    <div className="container h-100" ref={outsideRef}>
      <h4 className="sectionTitle text-center mb-5">historique</h4>
      <div className="filters mb-2 d-flex align-items-center justify-content-between">
        <div className="selectMenu">
          <div
            className="d-flex justify-content-between selectHeader p-2"
            onClick={() => toggleMenu(!isSelecting)}
          >
            <span>{selected ? selected : "Poste"}</span>
            <i className="bi bi-chevron-down"></i>
          </div>
          {isSelecting && (
            <div className="selectOptions">
              <ul className="options">
                <li
                  onClick={() => handleSelection("P1")}
                  className={`${selected === "P1" && "active"}`}
                >
                  P1
                </li>
                <li
                  onClick={() => handleSelection("P2")}
                  className={`${selected === "P2" && "active"}`}
                >
                  P2
                </li>
                <li
                  onClick={() => handleSelection("P3")}
                  className={`${selected === "P3" && "active"}`}
                >
                  P3
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* <select className="form-select col-lg-6 filterMenu">
          <option value="daily">Ce jour</option>
          <option value="weekly">Cette semaine</option>
          <option value="monthly">Ce mois</option>
        </select> */}
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Poste</th>
              <th scope="col">Début</th>
              <th scope="col">Fin</th>
              <th scope="col">Total</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions
              // .sort((a, b) => {
              //   if (a._id < b._id) return 1;
              //   if (a._id > b._id) return -1;
              //   return 0;
              // })
              .map((session) => (
                <tr key={session._id}>
                  <td>{session.station.name}</td>
                  <td>
                    {new Date(session.start).toLocaleString("fr", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>

                  <td>
                    {new Date(session.end).toLocaleString("fr", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>

                  <td>{formatCurrency(session.total)}</td>
                  <td>{session.user}</td>
                  <td>
                    <button className="btn btn-transparent p-0">
                      <i
                        className="bi bi-search "
                        data-bs-toggle="modal"
                        data-bs-target="#editUser"
                        // onClick={() => setUser(session)}
                      ></i>
                    </button>
                    <button className="btn btn-transparent p-0">
                      <i
                        className="bi bi-trash3 red"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteUser"
                        // onClick={() => setDeleteData(session)}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sessions;
