import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Switch, Route } from 'react-router-dom';

import Login from "./Login";
import AccountsRouter from "./accounts/AccountsRouter";

class LoginRouter extends Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/login' component={Login}/>
				</Switch>
			</main>
		);
	}
}

export default hot(module)(LoginRouter);