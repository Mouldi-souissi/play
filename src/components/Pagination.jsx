import React from "react";

function Pagination({
  postsPerPage,
  totalMoves,
  paginate,
  nextPage,
  previousPage,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMoves / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="d-flex flex-column justify-content-start align-items-center">
      <div className="d-flex justify-content-start align-items-center mb-2">
        <button
          className="btn btn-sm font-weight-bold me-2"
          onClick={() => previousPage(pageNumbers)}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item me-2">
            <button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number ? "btn-primary" : "btn-outline-primary"
              } btn btn-sm rounded font-weight-bold`}
              style={{ width: "40px" }}
            >
              {number}
            </button>
          </li>
        ))}
        <button
          className="btn btn-sm  font-weight-bold me-2"
          onClick={() => nextPage(pageNumbers)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div>
        Total: <span className="green">{totalMoves}</span>
      </div>
    </ul>
  );
}

export default Pagination;
