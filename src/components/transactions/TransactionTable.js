import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');

import { capitalizeFirstLetter } from '../functions';

class TransactionTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: this.props.filteredTransactions
		};
		//this.handleMonthSelection = this.handleMonthSelection.bind(this);
	}
	
	// Might need to sort through this to make sure the props are not the same
	// componentDidUpdate(prevProps) {
		// // Typical usage (don't forget to compare props):
		// if (this.props.userID !== prevProps.userID) {
			// this.fetchData(this.props.userID);
		// }
	// }
	
	// https://stackoverflow.com/questions/39778797/react-editable-table
	// Issue is I think I need a state here and then send final result back up to TransactionsMain. Otherwise it will filter every time the oinChange happens changes
	// Example: modify the cell here with onChange function, then onSave button will send the index and info back up to TransactionsMain => return (index, filteredTransactions[index])
	// Also repeat save button, but for deletion
	render(){
		//let transactions = this.state.transactions;
		console.log( this.state.transactions);
		let transactions = this.props.filteredTransactions;
		return(
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
				{transactions.map((transactionsData) => {
					return (
						<tr key={transactionsData.transaction_id}>
							<td>{transactionsData.description}</td>
							<td>${transactionsData.amount}</td>
							<td>{moment(transactionsData.date).format('MM/DD/YYYY')}</td>
							<td>{capitalizeFirstLetter(transactionsData.transaction_type_name)}</td>
						</tr>
					)
				})}
				</tbody>
			</table>
		);
	}
}
export default hot(module)(TransactionTable);