import React from 'react';
import { Link } from 'react-router';

export class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="notFound">
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p><Link to="/">Go back home.</Link></p>
      </div>
    );
  }
}