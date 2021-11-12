import React, { useState } from 'react';

import './Footer.css';
import { ThemeCheckbox } from '../../components/ThemeCheckbox/ThemeCheckbox';
import { idSelectOption } from '../../constants/common';

interface Props {
  pagesCountArr: Array<number>;
  updatePageNumber: (count: number) => void;
  updateLimitNumber: (count: number) => void;
  page: number;
}

export const Footer = ({
  pagesCountArr, updatePageNumber, updateLimitNumber, page,
}: Props) => {
  const [selectOption, setSelectOption] = useState(idSelectOption.groupBy10);

  const updatePage = (count: number) => {
    updatePageNumber(count);
  };

  const updateLimit = (option: string) => {
    let count;
    switch (option) {
      case idSelectOption.groupBy10:
        count = 10;
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
      <div className="paging">
        { pagesCountArr.length !== 0
          ? pagesCountArr.map((elem: number) => (
            <button
              className={`paging__button ${page === elem ? 'selected' : ''} `}
              type="button"
              key={elem}
              onClick={() => updatePage(elem)}
            >
              {elem}
            </button>
          ))
          : ''}
      </div>
      <div className="pageGroup">
        <select onChange={change} value={selectOption}>
          {
              [10, 20, 50].map((elem: number, index: number) => (
                <option value={`groupBy${elem}`} key={index}>
                  Группировать по
                  {' '}
                  {elem}
                </option>
              ))
            }
        </select>
      </div>
      <ThemeCheckbox />
    </div>
  );
};
