import React, { Component } from 'react';

class Card extends Component {
  render() {
    let classString = this.props.show ? "card show" : "card";

    return (
      <li className={classString}>
        <div className="title">
          {this.props.title}
        </div>
        <div className="author">
          - {this.props.author}
        </div>
      </li>
    );
  }
}

export default Card;
