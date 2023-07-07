import { useState } from "react";

function Paginate({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pushPage = (pageNumbers: JSX.Element[], i: number) => {
    pageNumbers.push(
      <li
        key={i}
        className={`cursor-pointer px-2 ${currentPage === i ? "border-2 border-[#FD6701]" : ""}`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </li>
    );
  };

  const renderPage = () => {
    const pageNumbers: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages < 5) {
        pushPage(pageNumbers, i);
      } else {
        if (currentPage < totalPages - 3) {
          if (
            (i < currentPage + 3 && i >= currentPage - 1) ||
            i == totalPages
          ) {
            pushPage(pageNumbers, i);
          } else if (i == currentPage + 3) {
            pageNumbers.push(<li>...</li>);
          }
        } else {
          if (i >= totalPages - 3 || i <= totalPages - currentPage + 1) {
            pushPage(pageNumbers, i);
          } else if (i == totalPages - 4) {
            pageNumbers.push(<li>...</li>);
          }
        }
      }
    }
    return pageNumbers;
  };
  return (
    <>
      <ul className="w-auto flex justify-center items-center gap-2">
        <li
          className={currentPage > 1 ? "w-6 h-6 flex justify-center items-center cursor-pointer bg-[#FD6701] text-white html" : "hidden"}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <img src="/less.svg"/>
        </li>
        {renderPage()}
        <li
          className={currentPage < totalPages ? "w-6 h-6 flex justify-center items-center cursor-pointer bg-[#FD6701] text-white html" : "hidden"}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <img src="/more.svg"/>
        </li>
      </ul>
    </>
  );
}

export default Paginate;
