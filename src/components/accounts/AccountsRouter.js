import React, { Component} from "react";
import { Link } from 'react-router-dom';
import {hot} from "react-hot-loader";
import { Switch, Route } from 'react-router-dom';

import AccountsMain from "./AccountsMain";
import Account from "./Account";

// This switch handles the accounts pages
class AccountsRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/accounts' render={(props) => <AccountsMain {...props} user_id={this.props.user_id} isAuthenticated={this.props.isAuthenticated}/>} />
					<Route path='/accounts/:id' render={(props) => <Account {...props} user_id={this.props.user_id} isAuthenticated={this.props.isAuthenticated}/>} />
					<Route render={() => (<div> Sorry, this page does not exist. </div>)} />
				</Switch>
			</div>
		);
	}
}
export default hot(module)(AccountsRouter);