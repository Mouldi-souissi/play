import React, { useEffect } from "react";
import { formatCurrency } from "../../../functions/formatCurrency";
import useGlobalStore from "../../../strore";

const Sessions = () => {
  const sessions = useGlobalStore((state) => state.sessions);
  const getSessions = useGlobalStore((state) => state.getSessions);

  useEffect(() => {
    getSessions();
  }, []);
  return (
    <div className="container">
      <h4 className="sectionTitle text-center mb-5">historique</h4>
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
                        className="bi bi-gear "
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
