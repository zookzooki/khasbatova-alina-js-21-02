import React, { useState } from 'react';

import './Footer.css';
import { ThemeCheckbox } from '../../components/ThemeCheckbox/ThemeCheckbox';
import { idSelectOption } from '../../constants/common';
import Pagination from '../../components/Pagination/Pagination';

interface Props {
  updatePageNumber: (count: number) => void;
  updateLimitNumber: (count: number) => void;
  page: number;
  pageSize: number;
  total: number;
}

export const Footer = ({
  updatePageNumber, updateLimitNumber, page, pageSize, total,
}: Props) => {
  const [selectOption, setSelectOption] = useState(idSelectOption.groupBy6);

  const updatePage = (count: number) => {
    updatePageNumber(count);
  };

  const updateLimit = (option: string) => {
    let count;
    switch (option) {
      case idSelectOption.groupBy6:
        count = 6;
        break;
      case idSelectOption.groupBy20:
        count = 20;
        break;
      case idSelectOption.groupBy50:
        count = 50;
        break;
      default:
        count = 10;
        break;
    }
    if (updateLimitNumber) {
      updateLimitNumber(count);
    }
  };

  const change = (event: any): void => {
    setSelectOption(event.currentTarget.value);
    updateLimit(event.currentTarget.value);
  };

  return (
    <div className="footer">
      <Pagination
        currentPage={page}
        totalCount={total}
        pageSize={pageSize}
        onPageChange={(el: number) => updatePage(el)}
      />
      <div className="pageGroup">
        <select onChange={change} value={selectOption}>
          {
              [6, 20, 50].map((elem: number, index: number) => (
                <option value={`groupBy${elem}`} key={index}>
                  {`Группировать по ${elem}`}
                </option>
              ))
            }
        </select>
      </div>
      <ThemeCheckbox />
    </div>
  );
};
