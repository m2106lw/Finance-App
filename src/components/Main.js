import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Switch, Route } from 'react-router-dom';

import Home from "./Home";
import AccountsRouter from "./accounts/AccountsRouter";

class Main extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/accounts' render={(props) => <AccountsRouter {...props} user_id={this.props.user_id} />} />
				</Switch>
			</main>
		);
	}
}

export default hot(module)(Main);