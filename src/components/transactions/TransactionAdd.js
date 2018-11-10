import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { capitalizeFirstLetter } from '../functions';

class TransactionAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			amount: "",
			date: "",
			transaction_type_id: "",
			account_id: "",
		}
		this.clearData = this.clearData.bind(this);
		this.saveData = this.saveData.bind(this);
	}
	
	componentDidMount() {
		let date = moment().format("YYYY-MM-DD");
		// For some reason the props aren't loaded before this is called
		// I figure I am doing something wrong in react
		this.setState({description: "", amount: 0.00, date: date, transaction_type_id: 0, account_id: 0});
	}
	
	clearData() {
		let date = moment().format("YYYY-MM-DD");
		this.setState({description: "", amount: 0.00, date: date, transaction_type_id: this.props.transactionTypes[1].value, account_id: this.props.accounts[1].value});
	}
	
	// We should handle null or bad values before allowing it to be added
	// Well, maybe not. It can always be edited later and it has default values or they are handled
	saveData() {
		// We need to double check that we are not sending zeroes for these ids, that would be bad
		// So we default to the first thing, the thing that's shown to the user
		if (this.state.transaction_type_id == 0) {
			var transaction_type_id = this.props.transactionTypes[1].transaction_type_id;
		}
		if (this.state.account_id == 0) {
			var account_id = this.props.accounts[1].account_id;
		}
		// Set up our transaction object
		let transaction = {
			description: this.state.description,
			amount: this.state.amount,
			date: this.state.date,
			transaction_type_id: transaction_type_id || this.state.transaction_type_id,
			account_id: account_id || this.state.account_id,
			transaction_id: 0
		};
		// Clear the data for a new transaction
		this.clearData();
		this.props.addTransaction(transaction);
	}
	
	render(){
		if (this.props.transactionTypes.length == 0 || this.props.accounts.length == 0) {
			return(<p>Loading</p>);
		}
		
		let transactionTypes = this.props.transactionTypes.filter((type) => {
			return type.transaction_type_id != -1;
		})
		let accounts = this.props.accounts.filter((account) => {
			return account.account_id != -1;
		})

		console.log(this.state.transaction_type_id);
		return(
			<div>
			<p>Insert a new transaction</p>
			<table>
				<tbody>
					<tr>
						<td>Description</td>
						<td>Amount</td>
						<td>Date</td>
						<td>Category</td>
						<td>Account</td>
						<td>Options</td>
					</tr>
					<tr>
						<td><input type="text" name="description" placeholder="Description" value={this.state.description} onChange={e => this.setState({description: e.target.value})} /></td>
							<td><input type="number" step="0.01" name="amount" value={this.state.amount} onChange={e => this.setState({amount: e.target.value})} /></td>
							<td><DatePicker selected={moment(this.state.date)} onChange={e => this.setState({date: moment(e._d).format('YYYY-MM-DD')})}/></td>
							<td>
								<select className={`type_id`} onChange={e => this.setState({transaction_type_id: e.target.value})} value={this.state.transaction_type_id}>
								{transactionTypes.map((type, index) => {
									return (
										<option key={index} value={type.transaction_type_id}>{capitalizeFirstLetter(type.name)}</option>
									)
								})}
								</select>
							</td>
							<td>
								<select className={`account_id`} onChange={e => this.setState({account_id: e.target.value})} value={this.state.account_id}>
								{accounts.map((account, index) => {
									return (
										<option key={index} value={account.account_id}>{account.name}</option>
									)
								})}
								</select>
							</td>
							<td>
								<div>
									<button onClick={this.saveData}>Save</button>
									<button onClick={this.clearData}>Clear</button>
								</div>
							</td>
					</tr>
				</tbody>
			</table>
			</div>
		);
	}
}
export default hot(module)(TransactionAdd);