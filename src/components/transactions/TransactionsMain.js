import React, { Component} from "react";
import {hot} from "react-hot-loader";
//import { Link } from 'react-router-dom';
const axios = require('axios');
const moment = require('moment');
import Select from 'react-select';

import TransactionTable from './TransactionTable';
import TransactionAdd from './TransactionAdd';
import { months } from '../templates';
import { capitalizeFirstLetter } from '../functions';

class TransactionsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			transactionTypes: [],
			transactionYears: [],
			transactionMonths: months,
			accounts: [],
			selectedYear: (new Date()).getFullYear(),
			isLoading: true
		}
		this.handleYearSelection = this.handleYearSelection.bind(this);
		this.handleTransactionChange = this.handleTransactionChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSave = this.onSave.bind(this);
		this.addTransaction = this.addTransaction.bind(this);
		this.checkForYear = this.checkForYear.bind(this);
	}
	
	// Need to work on updating differnet so there aren't three seperate renders
	componentDidMount() {
		// Break this into it's own function
		let user_id = this.props.user_id;
		axios.get("http://localhost:8080/api/getTransactions?user_id=" + user_id)
			.then(response => response.data)
			.then(data => this.setState({transactions: data}))
			.catch(error => console.log(error));
			
		// Now grab the transaction types
		axios.get("http://localhost:8080/api/getTransactionTypes")
			.then(response => response.data)
			.then(data => {
				//data.unshift({"transaction_type_id": -1, "name": "any"});
				this.setState({transactionTypes: data});			
			})
			.catch(error => console.log(error));

		// Need to clean this one up some
		axios.get("http://localhost:8080/api/getTransactionsYears?user_id=" + user_id)
			.then(response => response.data)
			.then(data => {
				let yearFound = data.find(year => year.year === this.state.selectedYear);
				if(yearFound === undefined) {data.unshift({year: this.state.selectedYear})};
				let transactionYears = data.map((year) => {
					return {"value": year.year, "label": year.year}
				})
				this.setState({transactionYears: transactionYears})
			})
			.catch(error => console.log(error));
			
		axios.get("http://localhost:8080/api/getAccounts?user_id=" + user_id)
			.then(response => response.data)
			.then(data => this.setState({accounts: data}))
			.catch(error => console.log(error));
		this.setState({isLoading: false});
	}
	
	handleYearSelection(year) {
		// We will need to load transactions for the selected year's data
		this.setState({selectedYear: year});
	}
	
	checkForYear(value) {
		return this.state.transactionYears.some(year => year.label === moment(value).year());
	}
	
	// Maybe look through here and check on the year to see if we need to delete it from selection
	onDelete(transaction_id) {
		let transactions = this.state.transactions;
		let index = transactions.findIndex((transaction) => {
			return transaction["transaction_id"] == transaction_id;
		});
		transactions.splice(index, 1);
		this.setState({transactions: transactions})
	}

	// Work on API for saving
	onSave(transaction_id) {
		console.log("Saving...");
		console.log("Done");
	}
	
	// IDEA: Make this more reuasable, so for both new and existing transactions
	// Might need to return a success or not
	addTransaction(transaction) {
		// Make axios call for insertion here, we need to wait for it so that we can get a actual transaction_id		
		console.log(transaction);
		let transaction_id = axios.post("http://localhost:8080/api/postTransaction", {
				transaction: transaction
			})
			.then(response => response.data)
			.then(data => {
				return data
			})
			.catch(error => console.log(error));
			
		if (!this.checkForYear(transaction.date)) {
			let transactionYears = this.state.transactionYears;
			transactionYears.push({"value": moment(transaction.date).year(), "label": moment(transaction.date).year()})
			this.setState({transactionYears: transactionYears})
		}
		else {
			let transactions = this.state.transactions;
			transactions.push(transaction);	
			this.setState({transactions: transactions});
		}
	}
	
	// Need to figure out how to handle errors for the inputs
	// Don't handle the new years being added here, only when saved
	// Then we can remove them from the current transaction list, preferably above
	handleTransactionChange(id, key, value) {
		let transactions = this.state.transactions;
		let index = transactions.findIndex((transaction) => {
			return transaction["transaction_id"] == id;
		});
		transactions[index][key] = value;
		
		// Might need to do a search for the right transaction type name
		// Might need to do a search for the right account name
		
		console.log("Change found", transactions[index]);
		// So far this does not work, it just adds the previous years
		// Need to also be able to handle coversion to and from utc
		if (key == "date" && !this.checkForYear(value)) {
			let transactionYears = this.state.transactionYears;
			transactionYears.push({"value": moment(value).year(), "label": moment(value).year()})
			this.setState({transactionYears: transactionYears})
		}
		else {
			this.setState({transactions: transactions})
		}
	}
	
	// Design: Have Main hold transactions. Have filter component, display transactions component, and insert new transaction component
	//  	   Main will pass display info based filters recieved, but always holds all the info
	render(){
		if (this.state.isLoading) {
			return (<p>Loading...</p>);
		}
		let transactions = this.state.transactions || [];
		let transactionTypes = this.state.transactionTypes;
		let transactionYears = this.state.transactionYears;
		//console.log(transactionYears);

		// Look into having TransactionTable handle the filtering
		return(
			<div className="transactionsPage">
				<div style={{ width: "40%" }}>
					<Select onChange={e => this.handleYearSelection} options={transactionYears}/>
				</div>
				<div>
					<TransactionTable 
						transactions={transactions} 
						handleTransactionChange={this.handleTransactionChange} 
						transactionTypes={this.state.transactionTypes} 
						accounts={this.state.accounts}
						onDelete={this.onDelete}
						onSave={this.onSave}
					/>
				</div>
				<br/>
				<TransactionAdd transactionTypes={this.state.transactionTypes} accounts={this.state.accounts} addTransaction={this.addTransaction}/>
			</div>
		);
				// <GenericSelect passSelection={this.handleTypeSelection} selectArray={this.state.transactionTypes} defaultValue={this.state.typeSelected}/>
				// <GenericSelect passSelection={this.handleYearSelection} selectArray={this.state.transactionYears} defaultValue={this.state.selectedYear}/>
				// <GenericSelect passSelection={this.handleMonthSelection} selectArray={this.state.transactionMonths} defaultValue={this.state.selectedMonth}/>
				// <GenericSelect passSelection={this.handleAccountSelection} selectArray={this.state.accounts} defaultValue={this.state.selectedAccount}/>
	}
}
export default hot(module)(TransactionsMain);