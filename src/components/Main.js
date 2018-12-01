import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Switch, Route } from 'react-router-dom';

import Home from "./Home";
import AccountsRouter from "./accounts/AccountsRouter";
import Login from "./login/Login";
import TransactionsRouter from "./transactions/TransactionsRouter";
import ReportsRouter from "./spending_reports/ReportsRouter";

class Main extends Component {
	constructor(props) {
		super(props);
	}
	
	// Maybe move this to App?
	// <Route path="/login" render={() => (<div> Sorry, signing in is not set up yet. </div>)} />
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/home' component={Home} />
					<Route path="/login" render={(props) => <Login {...props} parentState={this.props.parentState} handleLogin={this.props.handleLogin} handleLoginChange={this.props.handleLoginChange} />} />
					<Route path='/accounts' render={(props) => <AccountsRouter {...props} user_id={this.props.parentState.user_id} />} />
					<Route path='/transactions' render={(props) => <TransactionsRouter {...props} user_id={this.props.parentState.user_id} />} />
					<Route path='/spending_reports' render={(props) => <ReportsRouter {...props} user_id={this.props.parentState.user_id} />} />
					<Route render={() => (<div> Sorry, this page does not exist. </div>)} />
				</Switch>
			</main>
		);
	}
}

export default hot(module)(Main);