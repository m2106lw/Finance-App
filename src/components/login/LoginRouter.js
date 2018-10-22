import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Redirect, Route } from 'react-router-dom';

import Login from "./Login";

class LoginRouter extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<Route {...rest} render={(props) => (
				AuthService.isAuthenticated === true
				? <Component {...props} />
				: <Redirect to='/login' />
			)} />
		);
	}
}

export default hot(module)(LoginRouter);