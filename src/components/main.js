import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export class Main extends Component {

	render() {
		return (
			<div className="appContainer">
				<header>
					<h1>Hello, World!</h1>
				</header>
				<div className="appContent">

				</div>
			</div>
		)
	}
}

ReactDOM.render(<Main/>, document.getElementById("main"));