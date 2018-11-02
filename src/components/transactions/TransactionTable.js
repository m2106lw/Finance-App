import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');
import ReactTable from "react-table";
import "react-table/react-table.css";

import { capitalizeFirstLetter } from '../functions';
// Test
import GenericSelect from '../GenericSelect';

class TransactionTable extends Component {
	constructor(props) {
		super(props);
		//this.updateTransaction = this.updateTransaction.bind(this);
		this.renderEditable = this.renderEditable.bind(this);
		this.handleTypeSelection = this.handleTypeSelection.bind(this);
	}
				
	// updateTransaction(cellInfo) {
		// let id = cellInfo.original.transaction_id;
		// let key = cellInfo.column.id;
		// let value = cellInfo.value
		// this.props.handleTransactionChange(id, key, value);
	// }
	handleTypeSelection(typeId) {		
		console.log(typeId);
	}
	
	// Honestly not entirely sure what this does, but it's working for now
	renderEditable(cellInfo) {
		return (
			<div
				style={{ backgroundColor: "#fafafa" }}
				contentEditable
				suppressContentEditableWarning
				onBlur={e => {
					let id = cellInfo.original.transaction_id;
					let key = cellInfo.column.id;
					let value = cellInfo.value;
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
		//console.log(transactionTypes)
		return (
			<ReactTable
				data={transactions}
				columns={[
					{
						// Update not working
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
						Header: "Date",
						id: "date",
						accessor: transaction => moment(transaction.date).format('MM/DD/YYYY'),
					},
					{
						Header: "Type",
						id: "type",
						accessor: transaction => capitalizeFirstLetter(transaction.transaction_type_name),
						Cell: cellInfo => <GenericSelect passSelection={this.handleTypeSelection} selectArray={transactionTypes} defaultValue={cellInfo.original.transaction_type_id}/>
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