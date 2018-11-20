import React, { Component} from "react";
import {hot} from "react-hot-loader";
import  { Redirect } from 'react-router-dom'
const axios = require('axios');

import AccountBalances from "./AccountBalances";

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			account: {}
		};
	}
	
	componentDidMount() {
		let user_id = this.props.user_id
		let account_id = this.props.match.params.id;
		axios.get("http://localhost:8080/api/getAccount?account_id=" + account_id)
			.then(response => response.data)
			.then(data => this.setState({ account: data[0] }))
			.catch(error => console.log(error));
	}
	
	// TODO: Look into updating an account. Might want to leave it to the main page. Maybe both?
	render(){
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