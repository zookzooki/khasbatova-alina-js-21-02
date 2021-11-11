import React from 'react';

import './UserItem.css';

interface Props {
  id?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  picture?: string;
  className?: string;
}

export default class UserItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className={`user ${this.props.className}`}>
        <div className="user__picture"><img src={this.props.picture} alt="аватарка" /></div>
        <div className="user__info">
          <p className="user__id">{this.props.id}</p>
          <p className="user__name">
            {this.props.title}
            {' '}
            {this.props.firstName}
            {' '}
            {this.props.lastName}
          </p>
        </div>
      </div>
    );
  }
}
