import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Footer.css';
import { ThemeCheckbox } from '../../components/ThemeCheckbox/ThemeCheckbox';
import Pagination from '../../components/Pagination/Pagination';
import { updateCurPage, updateLimit } from '../../actions/UserListActions';

export const Footer = () => {
  const dispatch = useDispatch();
  const total = useSelector((state: any) => state.users.total);
  const curPage = useSelector((state: any) => state.users.curPage);
  const limit = useSelector((state: any) => state.users.limit);
  const optionLimit = useSelector((state: any) => state.users.optionLimit);

  return (
    <div className="footer">
      <Pagination
        currentPage={curPage}
        totalCount={total}
        pageSize={limit}
        onPageChange={(el: number) => dispatch(updateCurPage(el))}
      />
      <div className="pageGroup">
        <select value={optionLimit} onChange={(e) => dispatch(updateLimit(e.target.value))}>
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
