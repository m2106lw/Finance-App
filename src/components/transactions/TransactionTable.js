import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');
import ReactTable from "react-table";
import "react-table/react-table.css";

import { capitalizeFirstLetter } from '../functions';
import GenericSelect from '../GenericSelect';

class TransactionTable extends Component {
	constructor(props) {
		super(props);
		//this.updateTransaction = this.updateTransaction.bind(this);
		this.renderEditable = this.renderEditable.bind(this);
		this.handleTypeSelection = this.handleTypeSelection.bind(this);
	}

	// Might be able to just set these to this.props.handleTransactionChange
	// Special handler for the type selection
	handleTypeSelection(id, event) {
		let key = "transaction_type_id";
		let value = event.target.value;
		this.props.handleTransactionChange(id, key, value);
	}
	
	// Special handler for the type selection
	handleAccountSelection(id, event) {
		let key = "account_id";
		let value = event.target.value;
		this.props.handleTransactionChange(id, key, value);
	}
	
	// Honestly not entirely sure what this does, but it's working for now
	// Might not need to push to parent until saving
	renderEditable(cellInfo) {
		return (
			<div
				style={{ backgroundColor: "#fafafa" }}
				contentEditable
				suppressContentEditableWarning
				onBlur={e => {
					let id = cellInfo.original.transaction_id;
					let key = cellInfo.column.id;
					let value = e.target.innerHTML
					this.props.handleTransactionChange(id, key, value);
				}}
				dangerouslySetInnerHTML={{
					__html: this.props.filteredTransactions[cellInfo.index][cellInfo.column.id]
				}}
			/>
		);
	}
	
	// https://stackoverflow.com/questions/39778797/react-editable-table
	// Issue is I think I need a state here and then send final result back up to TransactionsMain. Otherwise it will filter every time the oinChange happens changes
	// Example: modify the cell here with onChange function, then onSave button will send the index and info back up to TransactionsMain => return (index, filteredTransactions[index])
	// Also repeat save button, but for deletion
	render(){
		let transactions = this.props.filteredTransactions;
		let transactionTypes = this.props.transactionTypes.filter((type) => {
			return type.value != -1;
		})
		let accounts = this.props.accounts.filter((account) => {
			return account.value != -1;
		})
		//console.log(transactionTypes)
		return (
			<ReactTable
				data={transactions}
				columns={[
					{
						Header: "Description",
						id: "description",
						accessor: transaction => transaction.description,
						Cell: this.renderEditable
					},
					{
						Header: "Amount",
						id: "amount",
						accessor: transaction => transaction.amount,
						Cell: this.renderEditable
					},
					{
						// Need to figure out how to do a calender here
						// might use https://www.npmjs.com/package/react-calendar or https://www.npmjs.com/package/react-moment
						Header: "Date",
						id: "date",
						accessor: transaction => moment(transaction.date).format('MM/DD/YYYY'),
					},
					{
						// Bug with showing the right account selected - state may not be getting changed?
						// Bug with selects => won't display the right selection. Need to check cellInfo
						// Need to figure out how to best match the style of the rest of the table
						Header: "Type",
						id: "type",
						accessor: transaction => capitalizeFirstLetter(transaction.transaction_type_name),
						Cell: cellInfo => {
							return (
							<select className={cellInfo.row.id} onChange={e => this.handleTypeSelection(cellInfo.original.transaction_id, e)} value={cellInfo.row.transaction_type_id}>
								{transactionTypes.map((value, index) => {
									return (
										<option key={index} value={value.value}>{value.name}</option>
									)
								})}
							</select>
							)
						}
					},
					{
						// Need to figure out how to best match the style of the rest of the table
						Header: "Account",
						id: "account",
						accessor: transaction => transaction.account_name,
						Cell: cellInfo => {
							return (
							<select className={cellInfo.row.id} onChange={e => this.handleAccountSelection(cellInfo.original.transaction_id, e)} value={cellInfo.row.account_id}>
								{accounts.map((value, index) => {
									return (
										<option key={index} value={value.value}>{value.name}</option>
									)
								})}
							</select>
							)
						}
					},
					{
						Header: "Options",
						id: "options",
						Cell: cellInfo => {
							return (
								<div>
									<button onClick={e => this.props.onSave(cellInfo.original.transaction_id)}>Save</button>
									<button onClick={e => this.props.onDelete(cellInfo.original.transaction_id)}>Delete</button>
								</div>
							)
						}
					},
				]}
				defaultPageSize={10}
				className="-striped -highlight"
			/>
		)
		// return(
			// <table>
				// <thead>
					// <tr>
						// <th>Description</th>
						// <th>Amount</th>
						// <th>Date</th>
						// <th>Category</th>
					// </tr>
				// </thead>
				// <tbody>
				// {transactions.map((transactionsData) => {
					// return (
						// <tr key={transactionsData.transaction_id}>
							// <td>{transactionsData.description}</td>
							// <td><input type="text" name="amount" value={transactionsData.amount} onChange={(event) => this.updateTransaction(transactionsData.transaction_id, event)} /></td>
							// <td>{moment(transactionsData.date).format('MM/DD/YYYY')}</td>
							// <td>{capitalizeFirstLetter(transactionsData.transaction_type_name)}</td>
						// </tr>
					// )
				// })}
				// </tbody>
			// </table>
		// );
	}
}
export default hot(module)(TransactionTable);