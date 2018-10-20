import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

import Main from "./components/main";
import Header from "./components/Header";

class App extends Component {
	constructor() {
		super();
	}
	
	render(){
		return(
			<div>
				<Header />
				<Main />
			</div>
		);
	}
}

export default hot(module)(App);