import React, { Component} from "react";
import {hot} from "react-hot-loader";

class Home extends Component {
	constructor() {
		super();
	}
	
	render () {
		return (
			<div>
				<h1>Welcome to the My Website!</h1>
			</div>
		);
	}
}
export default hot(module)(Home);