import React, { Component} from "react";
import {hot} from "react-hot-loader";
//import { Link } from 'react-router-dom';
const axios = require('axios');
const moment = require('moment');

import TransactionTable from './TransactionTable';
import GenericSelect from '../GenericSelect';
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
			selectedMonth: (new Date()).getMonth(),
			selectedAccount: -1,
			typeSelected: -1,
			isLoading: true
		}
		this.filterTransactions = this.filterTransactions.bind(this);
		this.handleTypeSelection = this.handleTypeSelection.bind(this);
		this.handleYearSelection = this.handleYearSelection.bind(this);
		this.handleMonthSelection = this.handleMonthSelection.bind(this);
		this.handleAccountSelection = this.handleAccountSelection.bind(this);
		this.handleTransactionChange = this.handleTransactionChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSave = this.onSave.bind(this);
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
				let transactionTypes = data.map((type) => {
					return {"value": type.transaction_type_id, "name": capitalizeFirstLetter(type.name)};
				});
				transactionTypes.unshift({"value": -1, "name": "Any"});
				this.setState({transactionTypes: transactionTypes})
			})			
			.catch(error => console.log(error));

		axios.get("http://localhost:8080/api/getTransactionsYears?user_id=" + user_id)
			.then(response => response.data)
			.then(data => {
				let yearFound = data.find(year => year.year === this.state.selectedYear);
				if(yearFound === undefined) {data.unshift({year: this.state.selectedYear})};
				let transactionYears = data.map((year) => {
					return {"value": year.year, "name": year.year}
				})
				this.setState({transactionYears: transactionYears})
			})
			.catch(error => console.log(error));
			
		axios.get("http://localhost:8080/api/getAccounts?user_id=" + user_id)
			.then(response => response.data)
			.then(data => {
				let accounts = data.map((account) => {
					return {"value": account.account_id, "name": account.name};
				});
				accounts.unshift({"value": -1, "name": "All"});
				this.setState({accounts: accounts})
			})
			.catch(error => console.log(error));
		this.setState({isLoading: false});
	}
	
	// This function will check our transaction against the user selected values and return the right filter
	filterTransactions(transaction) {
		if (this.state.typeSelected != -1) {var type = (transaction.transaction_type_id == this.state.typeSelected);}
		else {var type = true;}
		
		var year = (moment(transaction.date).year() == this.state.selectedYear);
		
		if (this.state.selectedMonth != -1) {var month = ((moment(transaction.date).month()) == this.state.selectedMonth);}
		else {var month = true;}
		
		if (this.state.selectedAccount != -1) {var account = (transaction.account_id == this.state.selectedAccount);}
		else {var account = true;}
		return type && year && month && account;
	};
	
	handleTypeSelection(typeId) {		
		this.setState({typeSelected: typeId});
	}
	handleYearSelection(year) {		
		this.setState({selectedYear: year});
	}
	handleMonthSelection(month) {		
		this.setState({selectedMonth: month});
	}
	handleAccountSelection(account_id) {
		console.log(account_id);		
		this.setState({selectedAccount: account_id});
	}
	
	onDelete(transaction_id) {
		let transactions = this.state.transactions;
		let index = transactions.findIndex((transaction) => {
			return transaction["transaction_id"] == transaction_id;
		});
		transactions.splice(index, 1);
		this.setState({transactions: transactions})
	}

	onSave(transaction_id) {
		console.log("Saving...");
		console.log("Done");
	}
	
	// Not sure I wanna do this since it causes a rerender each time
	// Need to figure out if that is the best way
	handleTransactionChange(id, key, value) {
		let transactions = this.state.transactions;
		let index = transactions.findIndex((transaction) => {
			return transaction["transaction_id"] == id;
		});
		transactions[index][key] = value;
		this.setState({transactions: transactions})
	}
	
	// https://github.com/JedWatson/react-select for drop down menus - split into it's own component and pass up transaction_type_id
	// Design: Have Main hold transactions. Have filter component, display transactions component, and insert new transaction component
	//  	   Main will pass display info based filters recieved, but always holds all the info
	render(){
		if (this.state.isLoading) {
			return (<p>Loading...</p>);
		}
		let transactions = this.state.transactions;
		let transactionTypes = this.state.transactionTypes;
		let filteredTransactions = transactions.filter(this.filterTransactions);
		// Will need a field to handle new transactions
		// Look into having TransactionTable handle the filtering
		return(
			<div className="transactionsPage">
				<GenericSelect passSelection={this.handleTypeSelection} selectArray={this.state.transactionTypes} defaultValue={this.state.typeSelected}/>
				<GenericSelect passSelection={this.handleYearSelection} selectArray={this.state.transactionYears} defaultValue={this.state.selectedYear}/>
				<GenericSelect passSelection={this.handleMonthSelection} selectArray={this.state.transactionMonths} defaultValue={this.state.selectedMonth}/>
				<GenericSelect passSelection={this.handleAccountSelection} selectArray={this.state.accounts} defaultValue={this.state.selectedAccount}/>
				<TransactionTable 
					filteredTransactions={filteredTransactions} 
					handleTransactionChange={this.handleTransactionChange} 
					transactionTypes={this.state.transactionTypes} 
					accounts={this.state.accounts}
					onDelete={this.onDelete}
					onSave={this.onSave}
				/>
			</div>
		);
	}
}
export default hot(module)(TransactionsMain);