import React, { Component} from "react";
import {hot} from "react-hot-loader";
import  { Redirect } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress';

import AccountBalances from "./AccountBalances";
import {get_account} from "../api_calls/accounts";

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			account: {},
			isLoading: true
		};
	}
	
	async componentDidMount() {
		let token = localStorage.getItem("token");
		let account_id = this.props.match.params.id;
		let account = await get_account(token, account_id);
		this.setState({account: account, isLoading: false});
	}
	
	// TODO: Look into updating an account. Might want to leave it to the main page. Maybe both?
	render(){
		if (this.state.isLoading) {
			return <CircularProgress/>
		}

		if (this.state.account == undefined) {
			return <Redirect to='/accounts'/>
		}
		return(
			<div className="indivdualAccount">
				<h1>{this.state.account.name}</h1>
				<h2>Current Balance: ${this.state.account.balance}</h2>
				<h3>{this.state.account.description}</h3>
				<AccountBalances account_id={this.props.match.params.id}/>
			</div>
		);
	}
}
export default hot(module)(Account);