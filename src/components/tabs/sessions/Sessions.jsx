import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../functions/formatCurrency";
import useGlobalStore from "../../../strore";
import CustomSelect from "../../CustomSelect";
import SessionDetails from "./SessionDetails";

const optionsPeriod = ["Ce jour", "Cette semaine", "Ce mois", "Tout"];

const Sessions = () => {
  const sessions = useGlobalStore((state) => state.sessions);
  const getSessions = useGlobalStore((state) => state.getSessions);
  const [periodFilter, setPeriodFilter] = useState("Ce jour");
  const [stationFilter, setStationFilter] = useState("Postes");
  const [filters, setFilter] = useState({
    period: "Ce jour",
    station: "Postes",
  });
  let filteredSession = sessions;
  const optionsStation = [
    "Postes",
    ...new Set(sessions.map((session) => session.station.name)),
  ];

  const getValues = (name, value) => {
    setFilter({ ...filters, [name]: value });
  };

  if (filters.station !== "Postes") {
    filteredSession = sessions.filter(
      (session) => session.station.name === filters.station
    );
  } else {
    filteredSession = sessions;
  }

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div className="container tabContent">
      <h4 className="sectionTitle text-center mb-5">historique</h4>
      <div className="filters mb-2 d-flex align-items-center justify-content-between">
        <CustomSelect
          options={optionsStation}
          getSelected={getValues}
          name="station"
        />
        <CustomSelect
          options={optionsPeriod}
          getSelected={getValues}
          name="period"
        />
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
            {filteredSession
              .sort((a, b) => {
                if (new Date(a.end) < new Date(b.end)) return 1;
                if (new Date(a.end) > new Date(b.end)) return -1;
                return 0;
              })
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
                        data-bs-target="#sessionDetails"
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
      <SessionDetails />
    </div>
  );
};

export default Sessions;
