import React from "react";

const Pagination = ({
  setCurrentPage,
  currentPage,
  postsPerPage,
  totalPosts,
}: any) => {
  const pageCount = Math.ceil(totalPosts / postsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="pagination">
        <button
          className="btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}>
          Prev
        </button>

        <ul>
          <p>
            Page {currentPage} of {pageCount}
          </p>
        </ul>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pageCount}
          className="btn">
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
