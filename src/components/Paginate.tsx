import { useState } from "react";

function Paginate({
  totalPages,
  current,
  totalData,
}: {
  totalPages: number;
  totalData: number;
  current: (x: number) => void | undefined;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    current(page);
  };

  const pushPage = (pageNumbers: JSX.Element[], i: number) => {
    pageNumbers.push(
      <li
        key={i}
        className={`cursor-pointer px-2 ${
          currentPage === i
            ? "border-2 border-kOrange-400"
            : "hover:bg-kOrange-200 hover:text-white"
        }`}
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
      {totalData == 0 && (
        <div className="mt-12 text-center text-12 xl:text-14">
          Data Tidak Ditemukan
        </div>
      )}
      <div className="mt-8 flex w-full grow flex-col items-center justify-end lg:flex-row lg:items-end xl:justify-between">
        <p className="hidden px-3 lg:block">
          {`Menunjukkan Entri ${
            totalData == 0 ? 0 : currentPage * 10 - 9
          } sampai ${
            totalData - currentPage * 10 > 0 ? currentPage * 10 : totalData
          } dari ${totalData}`}
        </p>
        <ul className="flex w-auto items-center justify-center gap-2">
          <li
            className={
              currentPage > 1
                ? "html flex h-6 w-6 cursor-pointer items-center justify-center bg-kOrange-400 text-white hover:bg-kOrange-300"
                : "hidden"
            }
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <img src="assets/less.svg" />
          </li>
          {renderPage()}
          <li
            className={
              currentPage < totalPages
                ? "html flex h-6 w-6 cursor-pointer items-center justify-center bg-kOrange-400 text-white hover:bg-kOrange-300"
                : "hidden"
            }
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <img src="assets/more.svg" />
          </li>
        </ul>
        <p className="visible px-3 text-12 text-kText lg:invisible lg:text-16">
          {`Menunjukkan Entri ${
            totalData == 0 ? 0 : currentPage * 10 - 9
          } sampai ${
            totalData - currentPage * 10 > 0 ? currentPage * 10 : totalData
          } dari ${totalData}`}
        </p>
      </div>
    </>
  );
}

export default Paginate;
