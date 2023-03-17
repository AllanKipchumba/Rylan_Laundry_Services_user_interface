import React, { useState } from "react";
import styles from "./pagination.module.scss";

interface IProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  clientsPerPage: number;
  totalClients: number;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  clientsPerPage,
  totalClients,
}: IProps) => {
  const pageNumbers = [];
  const totalPages = totalClients / clientsPerPage;

  //limit the sets of page numbers shown
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //create the page numbers
  for (let i = 1; i < Math.ceil(totalPages) + 1; i++) {
    pageNumbers.push(i);
  }

  //paginate
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Go to next page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);

    //show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  //Go to prev page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);

    //show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={
          currentPage === pageNumbers[0] ? `${styles.hidden}` : undefined
        }
      >
        Prev
      </li>

      {pageNumbers.map((number) => {
        return (
          number < maxPageNumberLimit + 1 &&
          number > minPageNumberLimit && (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={
                currentPage === number ? `${styles.active}` : undefined
              }
            >
              {number}
            </li>
          )
        );
      })}

      <li
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : undefined
        }
      >
        Next
      </li>

      <p>
        <b className={styles.page}>{`Page  ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};
