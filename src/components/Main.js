import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Switch, Route } from 'react-router-dom';

import Home from "./Home";
import AccountsRouter from "./accounts/AccountsRouter";

class Main extends Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/accounts' component={AccountsRouter}/>
				</Switch>
			</main>
		);
	}
}

export default hot(module)(Main);