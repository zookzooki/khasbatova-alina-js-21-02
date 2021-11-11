import React from 'react';
import './Footer.css';
import { ThemeCheckbox } from '../../components/ThemeCheckbox/ThemeCheckbox';

interface Props {
  pagesCountArr: Array<number>;
  updatePageNumber: (count: number) => void;
  updateLimitNumber: (count: number) => void;
  page: number;
}

interface State {
  selectOption: string;
}

const initialState = {
  selectOption: 'groupBy10',
};

export class Footer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    this.updatePage = this.updatePage.bind(this);
    this.change = this.change.bind(this);
  }

  updatePage(count: number) {
    this.props.updatePageNumber(count);
  }

  updateLimit(option: string) {
    let count;
    switch (option) {
      case 'groupBy10':
        count = 10;
        break;
      case 'groupBy20':
        count = 20;
        break;
      case 'groupBy50':
        count = 50;
        break;
      default:
        count = 100;
        break;
    }
    if (this.props.updateLimitNumber) {
      this.props.updateLimitNumber(count);
    }
  }

  change(event: any): void {
    this.setState({ selectOption: event.currentTarget.value });
    this.updateLimit(event.currentTarget.value);
  }

  render() {
    return (
      <div className="footer">
        <div className="paging">
          { this.props.pagesCountArr.length !== 0
            ? this.props.pagesCountArr.map((elem: number) => (
              <button
                className={`paging__button ${this.props.page === elem ? 'selected' : ''} `}
                type="button"
                key={elem}
                onClick={() => this.updatePage(elem)}
              >
                {elem}
              </button>
            ))
            : ''}
        </div>
        <div className="pageGroup">
          <select onChange={this.change.bind(this)} value={this.state.selectOption}>
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
  }
}
