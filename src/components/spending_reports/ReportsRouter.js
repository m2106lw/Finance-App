import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Switch, Route } from 'react-router-dom';

import ReportsMain from "./ReportsMain";

// This switch handles the accounts pages
class ReportsRouter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/spending_reports' render={(props) => <ReportsMain {...props} user_id={this.props.user_id} isAuthenticated={this.props.isAuthenticated}/>} />
					<Route render={() => (<div> Sorry, this page does not exist. </div>)} />
				</Switch>
			</div>
		);
	}
}
export default hot(module)(ReportsRouter);