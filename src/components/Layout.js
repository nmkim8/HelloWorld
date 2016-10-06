import React from 'react';
import { Link } from 'react-router';

export class Layout extends React.Component {
  render() {
    return (
      <div className="appContainer">
        <header>
          <h1>Hello, World!</h1>
        </header>
        <div className="appContent">{this.props.children}</div>
      </div>
    );
  }
}