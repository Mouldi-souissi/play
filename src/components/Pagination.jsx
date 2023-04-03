import React from "react";

function Pagination({
  totalItems,
  goToPage,
  nextPage,
  previousPage,
  currentPage,
  pages,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="d-flex flex-column justify-content-start align-items-center">
      <div className="d-flex justify-content-start align-items-center mb-2">
        <button
          className="btn btn-sm font-weight-bold me-2"
          onClick={() => previousPage()}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item me-2">
            <button
              onClick={() => goToPage(number)}
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
          onClick={() => nextPage()}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div>
        Total: <span className="green">{totalItems}</span>
      </div>
    </ul>
  );
}

export default Pagination;
