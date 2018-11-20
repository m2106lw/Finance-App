import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Link } from 'react-router-dom';
const axios = require('axios');

import AccountsMainTable from './AccountsMainTable';
import AccountsMainAdd from './AccountsMainAdd';

class AccountsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: [],
			error: false
		}
		this.addNewAccount = this.addNewAccount.bind(this);
	}
	
	componentDidMount() {
		// TODO: Break this into it's own function
		let user_id = this.props.user_id;
		axios.get("http://localhost:8080/api/getAccounts?user_id=" + user_id)
			.then(response => response.data)
			.then(data => this.setState({ accounts: data }))
			.catch(error => console.log(error));
	}
	
	addNewAccount(account) {
		console.log(account);
 		axios.post("http://localhost:8080/api/postAccount", {
				user_id: this.props.user_id,
				account_name: account.name,
				account_description: account.description,
				account_id: -1
			})
			.then(response => response.data)
			.then((data) => {
				console.log(data);
 				let new_id = data[0]["account_id"];
				let newAccount = {"account_id": new_id, "name": account.name, "description": account.description, "balance": 0.00};
				let accounts = this.state.accounts;
				accounts.push(newAccount);
				this.setState({accounts: accounts});
			})
			.catch((error) => {
				console.log(error);
			})
    }
	
	// TODO: Check if the account insertion should go under table
	// TODO: Check if we should allow editing of accounts from here
	render(){
		let accounts = this.state.accounts;
		return(
			<div className="accountsPage">
				<AccountsMainAdd addNewAccount={this.addNewAccount}/>
				<h3>Accounts</h3>
				<AccountsMainTable accounts={this.state.accounts}/>
			</div>
		);
	}
}
export default hot(module)(AccountsMain);