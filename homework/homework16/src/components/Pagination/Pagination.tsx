import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import './Pagination.css';

interface Props {
  totalCount: number,
  pageSize: number,
  siblingCount?: number,
  currentPage: number,
  onPageChange: (el: any) => void,
}

const Pagination = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage, onPageChange,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }
  return (
    <div>
      {paginationRange && paginationRange.map((pageNumber, index: number) => {
        if (pageNumber === DOTS) {
          return <button type="button" disabled className="paging__button" key={index}>&#8230;</button>;
        }

        return (
          <button
            type="button"
            className={`paging__button ${pageNumber === currentPage ? 'selected' : ''}`}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

Pagination.defaultProps = {
  siblingCount: 1,
};

export default Pagination;
