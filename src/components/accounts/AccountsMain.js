import React, { Component} from "react";
import {hot} from "react-hot-loader";
// Finance
import AccountsMainTable from './AccountsMainTable';
import AccountsMainAdd from './AccountsMainAdd';
import { get_accounts, create_account } from '../api_calls/accounts';

class AccountsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: [],
			error: false
		}
		this.addNewAccount = this.addNewAccount.bind(this);
	}
	
	async componentDidMount() {
		let token = localStorage.getItem("token");
		let accounts = await get_accounts(token);
		this.setState({accounts: accounts});
	}
	
	async addNewAccount(account) {
		//console.log(account);
		let token = localStorage.getItem("token");
		let account_id = await create_account(token, account.name, account.description);
		//console.log(account_id);
		let newAccount = {"account_id": account_id, "name": account.name, "description": account.description, "balance": 0.00};
		//console.log(newAccount);
		let accounts = this.state.accounts;
		accounts.push(newAccount);
		this.setState({accounts: accounts});
    }
	
	// TODO: Check if the account insertion should go under table
	// TODO: Check if we should allow editing of accounts from here
	render(){
		return(
			<div className="accountsPage">
				<AccountsMainAdd addNewAccount={this.addNewAccount}/>
				<h3>Accounts</h3>
				<AccountsMainTable accounts={this.state.accounts}/>
			</div>
		);
	}
}
export default AccountsMain;