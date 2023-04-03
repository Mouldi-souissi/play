import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../functions/formatCurrency";
import useGlobalStore from "../../../store";
import CustomSelect from "../../CustomSelect";
import Pagination from "../../Pagination";
import SessionDetails from "./SessionDetails";
import * as XLSX from "xlsx";
import usePagination from "../../../hooks/usePagination";

const optionsPeriod = ["Ce jour", "Cette semaine", "Ce mois", "Tout"];
const periodDic = {
  "Ce jour": "daily",
  "Cette semaine": "weekly",
  "Ce mois": "monthly",
  Tout: "all",
};

const Sessions = () => {
  const consoles = useGlobalStore((state) => state.consoles);
  const sessions = useGlobalStore((state) => state.sessions);
  const getSessions = useGlobalStore((state) => state.getSessions);
  const [filters, setFilter] = useState({
    period: "Ce jour",
    station: "Postes",
  });
  const [session, setSession] = useState({ games: [] });

  const filterdSessions = sessions.filter((se) => {
    if (filters.station === "Postes") {
      return true;
    }
    if (filters.station !== "Postes" && se.station.name !== filters.station) {
      return false;
    }
    return true;
  });

  const {
    currentPage,
    paginatedData,
    pages,
    itemsPerPage,
    goToPage,
    nextPage,
    previousPage,
  } = usePagination(filterdSessions);

  const optionsStation = ["Postes", ...consoles.map((c) => c.name)];

  const getValues = (name, value) => {
    setFilter({ ...filters, [name]: value });
  };

  useEffect(() => {
    getSessions(periodDic[filters.period]);
    goToPage(1);
  }, [filters.period]);

  useEffect(() => {
    if (!sessions.length) {
      getSessions();
    }
  }, []);

  const exportToExcel = () => {
    const formatedData = sessions.map((session) => {
      return {
        Poste: session.station.name,
        Début: new Date(session.start).toLocaleString("fr", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        Fin: new Date(session.end).toLocaleString("fr", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        Total: session.total,
        Utilisateur: session.user,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formatedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "sessions.xlsx");
  };

  return (
    <div className="container tabContent">
      <div className="d-flex align-items-center justify-content-center mb-5 mt-3">
        <h4 className="me-3 my-0 sectionTitle">historique</h4>
        <button className="btn btn-outline-primary" onClick={exportToExcel}>
          Export
        </button>
      </div>

      <div className="filters mb-2 d-flex align-items-center justify-content-between flex-wrap">
        <div className="me-5 mb-3">
          <CustomSelect
            options={optionsStation}
            getSelected={getValues}
            name="station"
            defaultSelectedOption={filters.station}
          />
        </div>
        <div className="mb-3">
          <CustomSelect
            options={optionsPeriod}
            getSelected={getValues}
            name="period"
            defaultSelectedOption={filters.period}
          />
        </div>
      </div>
      <div className="table-responsive mb-2">
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
            {paginatedData
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
                    <button
                      className="btn btn-transparent btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#sessionDetails"
                      onClick={() => setSession(session)}
                    >
                      <i className="bi bi-search green"></i>
                    </button>
                    {/* <button className="btn btn-transparent p-0">
                      <i
                        className="bi bi-trash3 red"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteUser"
      
                      ></i>
                    </button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex align-items-center justify-content-end mb-5">
        <Pagination
          className="pt-5"
          totalItems={filterdSessions.length}
          goToPage={goToPage}
          nextPage={nextPage}
          previousPage={previousPage}
          currentPage={currentPage}
          pages={pages}
        />
      </div>
      <SessionDetails session={session} />
    </div>
  );
};

export default Sessions;
