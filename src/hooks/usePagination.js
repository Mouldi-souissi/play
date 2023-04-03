import { useState, useEffect } from "react";

const usePagination = (data) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(data.length / itemsPerPage));
  }, [data]);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage + 1 <= pages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage - 1 >= 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    currentPage,
    paginatedData,
    pages,
    itemsPerPage,
    goToPage,
    nextPage,
    previousPage,
  };
};

export default usePagination;
