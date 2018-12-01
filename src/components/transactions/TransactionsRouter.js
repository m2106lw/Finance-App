import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Switch, Route } from 'react-router-dom';

import TransactionsMain from "./TransactionsMain";
import GasMain from "./gas/GasMain";

// This switch handles the transactions pages
class TransactionsRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	// Might add more later, might not
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/transactions' render={(props) => <TransactionsMain {...props} user_id={this.props.user_id} isAuthenticated={this.props.isAuthenticated}/>} />
					<Route exact path='/transactions/gas' render={(props) => <GasMain {...props} user_id={this.props.user_id} isAuthenticated={this.props.isAuthenticated}/>} />
					<Route render={() => (<div> Sorry, this page does not exist. </div>)} />
				</Switch>
			</div>
		);
	}
}
export default hot(module)(TransactionsRouter);