import React, { Component} from "react";
import {hot} from "react-hot-loader";
import moment from 'moment';

// Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
// Finance
import TransactionTable from './TransactionTable';
import TransactionAdd from './TransactionAdd';
import './transactions.css';
import {post_transaction, getTransactionsByYear, getTransactionTypes, getTransactionsYears, delete_transaction} from '../api_calls/transactions';
import {getAccounts} from '../api_calls/accounts'

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
	}
	
	// Need to work on updating differnet so there aren't three seperate renders
	async componentDidMount() {
		// TODO: Handle loading on errors
		// Grab all the transactions for the user
		let user_id = this.props.user_id;
		let transactions = await getTransactionsByYear(user_id, this.state.selectedYear);
		//this.setState({transactions: transactions});
		
		// Now grab the transaction types
		let transactionTypes = await getTransactionTypes();
		//this.setState({transactionTypes: transactionTypes})

		// Grab all the years the user has transactions for. Default to the current year
		let transactionYears = await getTransactionsYears(user_id);
		let yearFound = transactionYears.find(year => year.year === this.state.selectedYear);
		if(yearFound === undefined) {transactionYears.unshift({year: this.state.selectedYear})};
		//this.setState({transactionYears: transactionYears})
		
		// Finally grab all fo the users accounts, for selection
		let accounts = await getAccounts(user_id);
		this.setState({accounts: accounts})

		// TODO: Handle when data does not load
		this.setState({
			transactions: transactions,
			transactionTypes: transactionTypes,
			transactionYears: transactionYears,
			accounts: accounts,
			isLoading: false
		});
		//this.setState({isLoading: false});
	}
	
	async handleYearSelection(year) {
		// We will need to load transactions for the selected year's data
		if (year != this.state.selectedYear) {
			let user_id = this.props.user_id;
			let transactions = await getTransactionsByYear(user_id, year);
			this.setState({selectedYear: year, transactions: transactions});
		}
	}
	
	checkForYear(value) {
		return this.state.transactionYears.some(year => year.year === moment(value).year());
	}
	
	// This will delete a transaction based on the transaction_id that it recieves
	async deleteTransaction(transaction_id) {
		// TODO: Display error on failure to delete
		let deleteCheck = await delete_transaction(this.props.user_id, transaction_id);
		console.log("deleteCheck", deleteCheck);
		// Delete this transaction from our state
		let transactions = this.state.transactions;
		let index = transactions.findIndex((transaction) => {
			return transaction["transaction_id"] == transaction_id;
		});
		transactions.splice(index, 1);
		this.setState({transactions: transactions})
	}
	
	// This will insert a new transaction into the database
	async postTransaction(transactionObject) {
		// I don't like doing this, but it seems to come from the API server in the wrong format. Maybe fix on API side
		transactionObject.date = moment(transactionObject.date).format('YYYY-MM-DD');
		// Make axios call for insertion here, we need to wait for it so that we can get a actual transaction_id
		let transaction_id = await post_transaction(transactionObject);

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
	}
	
	// Main design:
	//	Year Selection: So we we only display one year at a time
	//  New Transaction Button: Creates a new transaction
	//  Transaction Table: Display and edit existing transactions
	render(){
		if (this.state.isLoading) {
			return <CircularProgress/>
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