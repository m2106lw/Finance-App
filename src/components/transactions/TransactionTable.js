import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');
// DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// react-table
import ReactTable from "react-table";
import "react-table/react-table.css";
// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { capitalizeFirstLetter } from '../functions';
import { months } from '../templates';

class TransactionTable extends Component {
	constructor(props) {
		super(props);
		this.renderEditable = this.renderEditable.bind(this);
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
					__html: this.props.transactions[cellInfo.index][cellInfo.column.id]
				}}
			/>
		);
	}

/* 	rowModifyButtons(row) {
		return (
			<div>
				<button key={"save-row"} onClick={e =>  this.props.onSave(row.data.transaction_id)}>Save</button>
				<button key={"delete-row"} onClick={e => this.props.onDelete(row.data.transaction_id)}>Delete</button>
			</div>
		)
	}

	rowDate(row) {
		return <DatePicker selected={moment(row.data.date)} onChange={e => this.props.handleTransactionChange(row.data.transaction_id, "date", e._d)}/>
	}

	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
	} */
	
	render(){
		let transactions = this.props.transactions;
		let transactionTypes = this.props.transactionTypes;
		let accounts = this.props.accounts.filter((account) => {
			return account.value != -1;
		})

		/*return (
			<div className="ag-theme-balham" style={{height: '500px',width: '600px' }}>
				<AgGridReact
					enableSorting={true}
					enableFilter={true}
					onGridReady={this.onGridReady.bind(this)}
			  		columnDefs={[
						{headerName: "Description", field: "description"},
				  		{headerName: "Amount", field: "amount"},
						{headerName: "Date", field: "date", cellRenderer: "datePicker", "width": 500, "cellStyle": { overflow: "visible", "white-space": "normal" }},
						{headerName: "Type", field: "transaction_type_id"},
						{headerName: "Account", field: "account_id"},
						{headerName: "Options", "field": "row", cellRenderer: "optionsButtons"}
					]}
				  	rowData={transactions.map((transaction, index) => {
						  return transaction
					})}
					context={{componentParent: this}}
					frameworkComponents={{
						optionsButtons: this.rowModifyButtons.bind(this),
						datePicker: this.rowDate.bind(this)
					}}
				>
				</AgGridReact>
			</div>
		)*/
 		return (
			<ReactTable
				data={transactions}
				filterable
				defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
				columns={[
					{
						Header: "Description",
						id: "description",
						accessor: transaction => transaction.description,
						Cell: this.renderEditable,
						// look into substrings
						filterMethod: (filter, row) => {
							return row[filter.id].toLowerCase().indexOf((filter.value).toLowerCase()) !== -1;
						}
					},
					{
						Header: "Amount",
						id: "amount",
						accessor: transaction => transaction.amount,
						Cell: this.renderEditable
					},
					{
						// might use https://www.npmjs.com/package/react-calendar or https://www.npmjs.com/package/react-moment
						Header: "Date",
						id: "date",
						accessor: transaction => moment(transaction.date).format("YYYY-MM-DD"),
						Cell: cellInfo => <DatePicker selected={moment(cellInfo.row.date)} onChange={e => this.props.handleTransactionChange(cellInfo.original.transaction_id, "date", e._d)}/>,
						filterMethod: (filter, row) => {
							if (filter.value == -1) {
								return true;
							}
							return moment(row[filter.id]).month() == filter.value;
						},
						Filter: ({ filter, onChange }) =>
							<select onChange={event => onChange(event.target.value)} style={{ width: "100%" }} value={filter ? filter.value : "all"}>
								{months.map(month => <option key={month.name} value={month.value}>{month.name}</option>)}
							</select>
					},
					{
						Header: "Type",
						id: "type",
						sortable: false,
						accessor: transaction => transaction.transaction_type_id,
						Cell: cellInfo => {
							return (
								<select style={{ width: "100%" }} className={`types-${cellInfo.original.transaction_id}`} onChange={e => this.props.handleTransactionChange(cellInfo.original.transaction_id, "transaction_type_id", e.target.value)} value={cellInfo.original.transaction_type_id}>
									{transactionTypes.map((type, index) => {
										return (
											<option key={index} value={type.transaction_type_id}>{capitalizeFirstLetter(type.name)}</option>
										)
									})}
								</select>
							)
						},
						filterMethod: (filter, row) => {
							console.log(filter.id);
							if (filter.value == -1) {
								return true;
							}
							return row[filter.id] == filter.value;
						},
						Filter: ({ filter, onChange }) =>
							<select onChange={event => onChange(event.target.value)} style={{ width: "100%" }} value={filter ? filter.value : "all"}>
								{transactionTypes.map((type,index) => <option key={index} value={type.transaction_type_id}>{capitalizeFirstLetter(type.name)}</option>)}
							</select>
					},
					{
						// Need to figure out how to best match the style of the rest of the table
						Header: "Account",
						id: "account",
						sortable: false,
						accessor: transaction => transaction.account_id,
						Cell: cellInfo => {
							return (
								<select style={{ width: "100%" }} className={`accounts-${cellInfo.original.transaction_id}`} onChange={e => this.props.handleTransactionChange(cellInfo.original.transaction_id, "account_id", e.target.value)} value={cellInfo.original.account_id}>
									{accounts.map((account, index) => {
										return (
											<option key={index} value={account.account_id}>{account.name}</option>
										)
									})}
								</select>
							)
						},
						filterMethod: (filter, row) => {
							console.log(filter.id);
							if (filter.value == -1) {
								return true;
							}
							return row[filter.id] == filter.value;
						},
						Filter: ({ filter, onChange }) =>
							<select onChange={event => onChange(event.target.value)} style={{ width: "100%" }} value={filter ? filter.value : "all"}>
								{accounts.map((account,index) => <option key={index} value={account.account_id}>{account.name}</option>)}
							</select>
					},
					{
						Header: "Options",
						id: "options",
						sortable: false,
						filterable: false,
						Cell: cellInfo => {
							return (
								<div>
									<button key={"save-row"} onClick={e => this.props.onSave(cellInfo.original.transaction_id)}>Save</button>
									<button key={"delete-row"} onClick={e => this.props.onDelete(cellInfo.original.transaction_id)}>Delete</button>
								</div>
							)
						}
					},
				]}
				defaultPageSize={10}
				className="-striped -highlight"
			/>
		)
		
		//<td>{moment(transaction.date).format('MM/DD/YYYY')}</td>
		//<td><input type="date" name="amount" value={moment(transaction.date).format('YYYY-MM-DD')} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "date", e.target.value)} /></td>
		// return(
			// <table>
				// <thead>
					// <tr>
						// <th>Description</th>
						// <th>Amount</th>
						// <th>Date</th>
						// <th>Category</th>
						// <th>Account</th>
						// <th>Options</th>
					// </tr>
				// </thead>
				// <tbody>
				// {transactions.map((transaction, index) => {
					// return (
						// <tr key={transaction.transaction_id}>
							// <td><input type="text" name="description" value={transaction.description} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "description", e.target.value)} /></td>
							// <td><input type="number" step="0.01" name="amount" value={transaction.amount} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "amount", e.target.value)} /></td>
							// <td><DatePicker selected={moment(transaction.date)} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "date", e)}/></td>
							// <td>
								// <select className={`type_id_index_${index}`} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "transaction_type_id", e.target.value)} value={transaction.transaction_type_id}>
								// {transactionTypes.map((value, index) => {
									// return (
										// <option key={index} value={value.value}>{value.name}</option>
									// )
								// })}
								// </select>
							// </td>
							// <td>
								// <select className={`account_id_index_${index}`} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "account_id", e.target.value)} value={transaction.account_id}>
								// {accounts.map((value, index) => {
									// return (
										// <option key={index} value={value.value}>{value.name}</option>
									// )
								// })}
								// </select>
							// </td>
							// <td>
								// <div>
									// <button onClick={e => this.props.onSave(transaction.transaction_id)}>Save</button>
									// <button onClick={e => this.props.onDelete(transaction.transaction_id)}>Delete</button>
								// </div>
							// </td>
						// </tr>
					// )
				// })}
				// </tbody>
			// </table>
		// );
	}
}
export default hot(module)(TransactionTable);