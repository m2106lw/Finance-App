import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Switch, Route, Link } from 'react-router-dom';
import "./App.css";
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

import Header from "./components/Header";
import Home from "./components/Home";
import AccountsRouter from "./components/accounts/AccountsRouter";
import Login from "./components/login/Login";
import TransactionsRouter from "./components/transactions/TransactionsRouter";
import ReportsRouter from "./components/spending_reports/ReportsRouter";

class App extends Component {
	constructor() {
		super();
		// This should change in the future
		this.state = {
			user_id: 1,
			isAuthenticated: false,
			auth_token: ""
		}
		this.handleAuthSucceed = this.handleAuthSucceed.bind(this);
	}
	
	handleAuthSucceed(auth_token) {
		this.setState({user_id: 1, isAuthenticated: true, auth_token: auth_token});
	}
	
	render(){
		return(
			<div className="main-grid">
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
				<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
				<div className="main-header"><Header /></div>
				<div className="main-body">
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route exact path='/home' component={Home} />
					<Route path="/login" render={(props) => <Login {...props} onAuthSucceed={this.handleAuthSucceed} isAuthenticated={this.state.isAuthenticated}  />} />
					<Route path='/accounts' render={(props) => <AccountsRouter {...props} user_id={this.state.user_id} isAuthenticated={this.state.isAuthenticated} />} />
					<Route path='/transactions' render={(props) => <TransactionsRouter {...props} user_id={this.state.user_id} isAuthenticated={this.state.isAuthenticated} />} />
					<Route path='/spending_reports' render={(props) => <ReportsRouter {...props} user_id={this.state.user_id} isAuthenticated={this.state.isAuthenticated} />} />
					<Route render={() => (<div> Sorry, this page does not exist. </div>)} />
				</Switch></div>
			</div>
		);
	}
}
export default hot(module)(App);