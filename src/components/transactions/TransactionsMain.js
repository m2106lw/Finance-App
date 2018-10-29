import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Link } from 'react-router-dom';
const axios = require('axios');
const moment = require('moment'); // This should be moved to whatever component handles the table

class TransactionsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			transactionTypes: [],
			name: "",
			description: "",
			error: false,
			year: 2018,
			month: 10,
			typeSelected: -1
		}
		this.filterTransactions = this.filterTransactions.bind(this);
		this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
		this.handleOptionSelection = this.handleOptionSelection.bind(this);
	}
	
	componentDidMount() {
		// Break this into it's own function
		let user_id = this.props.user_id;
		axios.get("http://localhost:8080/api/getTransactions?user_id=" + user_id)
			.then(response => response.data)
			.then(data => this.setState({ transactions: data }))
			.catch(error => console.log(error));
			
		// Now grab the transaction types
		axios.get("http://localhost:8080/api/getTransactionTypes")
			.then(response => response.data)
			.then(data => this.setState({ transactionTypes: data }))
			.catch(error => console.log(error));
	}
	
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	filterTransactions(transaction) {
		if (this.state.typeSelected != -1) {var type = (transaction.transaction_type_id == this.state.typeSelected);}
		else {var type = true;}
		return type;
			// let year = moment(transaction["date"]).year();
			// let month = moment(transaction["date"]).month() + 1;
			// console.log(this.state.year);
			// console.log(this.state.month);
			// return transaction["amount"] > 0 &&
				   // year == this.state.year &&
				   // month == this.state.month;
	};
	
	handleOptionSelection(e) {
		this.setState({typeSelected: e.target.value});
	}
	// Need to look into filtering data - figure out how to handle different filters in different orders
	// https://github.com/JedWatson/react-select for drop down menus - split into it's own component and pass up transaction_type_id
	// Design: Have Main hold transactions. Have filter component, display transactions component, and insert new transaction component
	//  	   Main will pass display info based filters recieved, but always holds all the info
	render(){
		let transactions = this.state.transactions;
		let transactionTypes = this.state.transactionTypes;
		let filteredTransactions = transactions.filter(this.filterTransactions);
		
		return(
			<div className="transactionsPage">
				<select className="transactionTypeFilter" onChange={this.handleOptionSelection}>
					<option key={-1} value={-1}>All</option>
					{transactionTypes.map((type) => {
						return (
							<option key={type.transaction_type_id} value={type.transaction_type_id}>{this.capitalizeFirstLetter(type.name)}</option>
						)
					})}
				</select>
			<table>
				<thead>
					<tr>
						<th>Description</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{filteredTransactions.map((transactionsData) => {
						return (
							<tr key={transactionsData.transaction_id}>
								<td>{transactionsData.description}</td>
								<td>${transactionsData.amount}</td>
								<td>{moment(transactionsData.date).format('MM/DD/YYYY')}</td>
								<td>{this.capitalizeFirstLetter(transactionsData.transaction_type_name)}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			</div>
		);
	}
}
export default hot(module)(TransactionsMain);