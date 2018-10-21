import React, { Component} from "react";
import {hot} from "react-hot-loader";
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
		axios.get("http://localhost:8080/api/getAccountById?account_id=" + account_id)
			.then(response => response.data)
			.then(data => this.setState({ account: data[0] }))
			.catch(error => console.log(error));
	}
	
	// Need to figure out what to show for each account - either balance and/or transactions
	// But then the above leads to should they be able to insert a transaction from this page? Will that make the other page redundent?
	// Also need to figure out how to update an account here
	render(){
		return(
			<div className="accountsPage">
				<p>{this.state.account.name}   ${this.state.account.total}</p>
				<p>{this.state.account.description}</p>
				<AccountBalances account_id={this.props.match.params.id}/>
			</div>
		);
	}
}
export default hot(module)(Account);