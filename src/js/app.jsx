import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, DefaultRoute} from 'react-router';

export class App extends Component {

	render() {
		return (
			<div>
				Hello, World!
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById("app"));