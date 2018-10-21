import React, { Component} from "react";
import { Link } from 'react-router-dom';
import {hot} from "react-hot-loader";
import { Switch, Route } from 'react-router-dom';

import AccountsMain from "./AccountsMain";
import Account from "./Account";

// This switch handles the accounts pages
class AccountsRouter extends Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/accounts' render={(props) => <AccountsMain {...props} user_id={this.props.user_id} />} />
					<Route path='/accounts/:id' render={(props) => <Account {...props} user_id={this.props.user_id} />} />
				</Switch>
			</main>
		);
	}
}
export default hot(module)(AccountsRouter);