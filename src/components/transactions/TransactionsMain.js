import React, { Component} from "react";
import {hot} from "react-hot-loader";
//import { Link } from 'react-router-dom';
const axios = require('axios');
const moment = require('moment');

// Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import TransactionTable from './TransactionTable';
import TransactionAdd from './TransactionAdd';
import './transactions.css';

class TransactionsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			transactionTypes: [],
			transactionYears: [],
			accounts: [],
			selectedYear: (new Date()).getFullYear(),
			isLoading: true
		}
		this.handleYearSelection = this.handleYearSelection.bind(this);
		this.deleteTransaction = this.deleteTransaction.bind(this);
		this.postTransaction = this.postTransaction.bind(this);
		this.checkForYear = this.checkForYear.bind(this);
		this.post_transaction = this.post_transaction.bind(this);
	}
	
	// Need to work on updating differnet so there aren't three seperate renders
	async componentDidMount() {
		// Break this into it's own function
		// Preferably change this to go after the years and look for only current year
		// Grab all the transactions for the user
		let user_id = this.props.user_id;
		axios.get("http://localhost:8080/api/getTransactionsByYear?user_id=" + this.props.user_id + "&year=" + this.state.selectedYear)
			.then(response => response.data)
			.then(data => this.setState({transactions: data}))
			.catch(error => console.log(error));
			
		// Now grab the transaction types
		axios.get("http://localhost:8080/api/getTransactionTypes")
			.then(response => response.data)
			.then(data => this.setState({transactionTypes: data}))
			.catch(error => console.log(error));

		// Need to clean this one up some
		// Grab all the years the user has transactions for. Default to the current year
		axios.get("http://localhost:8080/api/getTransactionsYears?user_id=" + user_id)
			.then(response => response.data)
			.then(data => {
				let yearFound = data.find(year => year.year === this.state.selectedYear);
				if(yearFound === undefined) {data.unshift({year: this.state.selectedYear})};
				this.setState({transactionYears: data})
			})
			.catch(error => console.log(error));
		
		// Finally grab all fo the users accounts, for selection
		axios.get("http://localhost:8080/api/getAccounts?user_id=" + user_id)
			.then(response => response.data)
			.then(data => this.setState({accounts: data}))
			.catch(error => console.log(error));
		this.setState({isLoading: false});
	}
	
	handleYearSelection(year) {
		// We will need to load transactions for the selected year's data
		if (year != this.state.selectedYear) {
			axios.get("http://localhost:8080/api/getTransactionsByYear?user_id=" + this.props.user_id + "&year=" + year)
				.then(response => response.data)
				.then(data => this.setState({selectedYear: year, transactions: data}))
				.catch(error => console.log(error));
		}
	}
	
	checkForYear(value) {
		return this.state.transactionYears.some(year => year.year === moment(value).year());
	}
	
	// This will delete a transaction based on the transaction_id that it recieves
	deleteTransaction(transaction_id) {
		// TODO: Add delete api call
		/* let deleteCheck = axios.post("http://localhost:8080/api/postTransaction", {
				transaction_id: transaction_id
			})
			.then(response => response.data)
			.then(data => {
				return data
			})
			.catch(error => console.log(error)); */
		// Delete this transaction from our state
		let transactions = this.state.transactions;
		let index = transactions.findIndex((transaction) => {
			return transaction["transaction_id"] == transaction_id;
		});
		transactions.splice(index, 1);
		this.setState({transactions: transactions})
	}

	// TODO: Implement this better, like better error handling and actually send a promise.
	async post_transaction(transactionObject) {
		return axios.post("http://localhost:8080/api/postTransaction", {
				transaction: transactionObject
		})
		.then(response => response.data)
		.then(data => {
			console.log("Data post_transaction", data);
			return data[0]["transaction_id"];
		})
		.catch(error => console.log(error));
	}
	
	// This will insert a new transaction into the database
	async postTransaction(transactionObject) {
		// I don't like doing this, but it seems to come from the API server in the wrong format. Maybe fix on API side
		transactionObject.date = moment(transactionObject.date).format('YYYY-MM-DD');
		// Make axios call for insertion here, we need to wait for it so that we can get a actual transaction_id
		let transaction_id = await this.post_transaction(transactionObject);

		// Not sure if I want the new transaction visible when the year is different than the current one
		// If the new or modified transaction has a year in its date that we don't already have then we will add it to our transactionYears list
		// Otherwise there is no state to update
		if (!this.checkForYear(transactionObject.date)) {
			let transactionYears = this.state.transactionYears;
			transactionYears.push({"year": moment(transactionObject.date).year()});
			this.setState({transactionYears: transactionYears});
		}
		// Getting the year ir something below seems to break the transaction
		else if (moment(transactionObject.date).year() == this.state.selectedYear) {
			console.log("Testing object", transactionObject)
			// Maybe try to sort this or see if the table can handle it
			let transactions = this.state.transactions;
			transactionObject.transaction_id = transaction_id;
			transactions.push(transactionObject);
			this.setState({transactions: transactions});
		}
		// Extra code for if I change my mind
/* 		let transactionYears = this.state.transactionYears;
		if (!this.checkForYear(transaction.date)) {
			transactionYears.push({"year": moment(transaction.date).year()})
		}
		let transactions = this.state.transactions;
		transactions.push(transaction);
		this.setState({transactions: transactions, transactionYears: transactionYears}); */
	}
	
	// Main design:
	//	Year Selection: So we we only display one year at a time
	//  New Transaction Button: Creates a new transaction
	//  Transaction Table: Display and edit existing transactions
	render(){
		if (this.state.isLoading) {
			return (<p>Loading...</p>);
		}
		let transactions = this.state.transactions || [];

		// Look into having TransactionTable handle the filtering
		return(
			<div className="transaction-grid">
				<div className={"transaction-year-select"} style={{ width: "20%" }}>
					<InputLabel htmlFor="year-select">Select Year</InputLabel>
					<Select onChange={e => this.handleYearSelection(e.target.value)} style={{ width: "100%" }} value={this.state.selectedYear}>
						{this.state.transactionYears.map((year, index) => <MenuItem key={index} value={year.year}>{year.year}</MenuItem>)}
					</Select>
				</div>
				<div className={"transaction-new-button"}>
					<TransactionAdd transactionTypes={this.state.transactionTypes} accounts={this.state.accounts} postTransaction={this.postTransaction}/>
				</div>
				<div className={"transaction-data-table"}>
					<TransactionTable 
						transactions={transactions} 
						transactionTypes={this.state.transactionTypes} 
						accounts={this.state.accounts}
						deleteTransaction={this.deleteTransaction}
						postTransaction={this.postTransaction}
					/>
				</div>
			</div>
		);
	}
}
export default hot(module)(TransactionsMain);