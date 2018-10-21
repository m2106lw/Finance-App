import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

import Main from "./components/main";
import Header from "./components/Header";

class App extends Component {
	constructor() {
		super();
		// This should change in the future
		this.state = {
			user_id: 1
		}
	}
	
	render(){
		return(
			<div className="main-grid">
				<div className="main-header"><Header /></div>
				<div className="main-body"><Main user_id={this.state.user_id}/></div>
			</div>
		);
	}
}

export default hot(module)(App);