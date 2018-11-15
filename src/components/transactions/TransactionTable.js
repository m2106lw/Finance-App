import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');
// React Table
//import ReactTable from "react-table";
//import 'react-table/react-table.css'
// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
//
import TransactionModal from './TransactionModal';

import { capitalizeFirstLetter } from '../functions';
import { months } from '../templates';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class TransactionTable extends Component {
	constructor(props) {
		super(props);
		this.state ={
			modalOpen: false,
			transaction: {}
		}
		//this.renderEditable = this.renderEditable.bind(this);
		this.onGridReady = this.onGridReady.bind(this);
		//this.rowModifyButtons = this.rowModifyButtons.bind(this);
		// Make sure these are not needed to be rerendered everytime
		this.rowDate = this.rowDate.bind(this);
		this.rowType = this.rowType.bind(this);
		this.rowAccount = this.rowAccount.bind(this);
		this.onModalClose = this.onModalClose.bind(this);
	}

	onModalClose() {
		this.setState({modalOpen: false, transaction: {}});
	}
	
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
	}

	rowDate(row) {
		return moment(row.data.date).format("YYYY-MM-DD")
	}

	rowType(row) {
		return (
			this.props.transactionTypes.map((type) => {
				if (row.data.transaction_type_id == type.transaction_type_id) return capitalizeFirstLetter(type.name)
			})
		)
	}

	rowAccount(row) {
		return (
			this.props.accounts.map((account) => {
				if (row.data.account_id == account.account_id) return account.name
			})
		)
	}

	rowModifyButtons(row) {
		//<button key={"save-row"} onClick={e =>  this.props.onSave(row.data.transaction_id)}>Save</button>
		return (
			<div>
				<button key={"edit-row"} onClick={e => this.setState({transaction: row.data, modalOpen: true})}>Edit</button>
				<button key={"delete-row"} onClick={e => this.props.onDelete(row.data.transaction_id)}>Delete</button>
			</div>
		)
	}
	
	render(){
		let transactions = this.props.transactions;
		// Set up tranaaction types list
		let transactionTypes = this.props.transactionTypes;
		// Set up accounts list
		let accounts = this.props.accounts;
		let modalOpen = this.state.modalOpen;
		let transaction = this.state.transaction

		// Find a better way to handle this
		if (transactionTypes.length == 0) return <p>Loading...</p>
		if (accounts.length == 0) return <p>Loading...</p>

		return (
			<div className="ag-theme-material" style={{height: '600px',width: '75%' }}>
				<AgGridReact
					enableSorting={true}
					enableFilter={true}
					onGridReady={this.onGridReady}
					rowSelection={"single"}
			  		columnDefs={[
						{headerName: "Description", field: "description"},
				  		{headerName: "Amount", field: "amount"},
						{headerName: "Date", field: "date", cellRenderer: "rowDate"},
						{headerName: "Type", field: "transaction_type_id", cellRenderer: "rowType"},
						{headerName: "Account", field: "account_id", cellRenderer: "rowAccount"},
						{headerName: "Options", "field": "row", cellRenderer: "optionsButtons"}
					]}
				  	rowData={transactions.map((transaction, index) => {
						return transaction;
					})}
					context={{componentParent: this}}
					frameworkComponents={{
						optionsButtons: this.rowModifyButtons.bind(this),
						rowDate: this.rowDate,
						rowType: this.rowType,
						rowAccount: this.rowAccount
					}}
				>
				</AgGridReact>
				<TransactionModal isOpen={modalOpen} transaction={transaction} onModalClose={this.onModalClose}/>
			</div>
		)
/*    		return (
			// New plan, scrap this table and look into static table we can edit by selecting the row
			<ReactTable
				data={transactions}
				filterable
				defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
				columns={[
					{
						Header: "Description",
						id: "description",
						accessor: transaction => transaction.description,
						Cell: cellInfo => <TextField id="standard-name"	
											label="Description"
											style={{ width: "100%" }}
										   	//className={classes.textField}
										   	value={cellInfo.row.description}
										   	onChange={e =>this.props.handleTransactionChange(cellInfo.original.transaction_id, "description", e.target.value)}
										   	margin="none"
										   />, 
						// look into substrings
						filterMethod: (filter, row) => {
							return row[filter.id].toLowerCase().indexOf((filter.value).toLowerCase()) !== -1;
						}
					},
					{
						Header: "Amount",
						id: "amount",
						accessor: transaction => transaction.amount,
						Cell: cellInfo => <Input id="adornment-amount" style={{ width: "100%" }} value={cellInfo.row.amount} onChange={e =>this.props.handleTransactionChange(cellInfo.original.transaction_id, "amount", e.target.value)} startAdornment={<InputAdornment position="start">$</InputAdornment>}/>
					},
					{
						Header: "Date",
						id: "date",
						accessor: transaction => transaction.date,
						Cell: cellInfo => <MuiPickersUtilsProvider utils={MomentUtils}><DatePicker value={cellInfo.row.date} showTodayButton onChange={e =>this.props.handleTransactionChange(cellInfo.original.transaction_id, "date", e._d)}/></MuiPickersUtilsProvider>,
						filterMethod: (filter, row) => {
							if (filter.value == -1) {
								return true;
							}
							return moment(row[filter.id]).month() == filter.value;
						},
						Filter: ({ filter, onChange }) =>
							<Select onChange={event => onChange(event.target.value)} style={{ width: "100%" }} value={filter ? filter.value : "all"}>
								{months.map(month => <MenuItem key={month.name} value={month.value}>{month.name}</MenuItem>)}
							</Select>
					},
					{
						Header: "Type",
						id: "type",
						sortable: false,
						accessor: transaction => transaction.transaction_type_id,
						Cell: cellInfo => {
							return (
								<Select style={{ width: "100%" }} className={`types-${cellInfo.original.transaction_id}`} onChange={e => this.props.handleTransactionChange(cellInfo.original.transaction_id, "transaction_type_id", e.target.value)} value={cellInfo.original.transaction_type_id}>
									{transactionTypes.map((type, index) => {
										return (
											<MenuItem key={index} value={type.transaction_type_id}>{capitalizeFirstLetter(type.name)}</MenuItem>
										)
									})}
								</Select>
							)
						},
						filterMethod: (filter, row) => {
							console.log(filter.id);
							if (filter.value == 0) {
								return true;
							}
							return row[filter.id] == filter.value;
						},
						Filter: ({ filter, onChange }) =>
							<Select onChange={event => onChange(event.target.value)} style={{ width: "100%" }} value={filter ? filter.value : "all"}>
								<MenuItem key={`filter-transaction-type-any`} value={0}>{"Any"}</MenuItem>
								{transactionTypes.map((type,index) => <MenuItem key={index} value={type.transaction_type_id}>{capitalizeFirstLetter(type.name)}</MenuItem>)}
							</Select>
					},
					{
						// Need to figure out how to best match the style of the rest of the table
						Header: "Account",
						id: "account",
						sortable: false,
						accessor: transaction => transaction.account_id,
						Cell: cellInfo => {
							return (
								<Select style={{ width: "100%" }} className={`accounts-${cellInfo.original.transaction_id}`} onChange={e => this.props.handleTransactionChange(cellInfo.original.transaction_id, "account_id", e.target.value)} value={cellInfo.original.account_id}>
									{accounts.map((account, index) => <MenuItem key={index} value={account.account_id}>{account.name}</MenuItem>)}
								</Select>
							)
						},
						filterMethod: (filter, row) => {
							console.log(filter.id);
							if (filter.value == 0) {
								return true;
							}
							return row[filter.id] == filter.value;
						},
						Filter: ({ filter, onChange }) =>
							<Select onChange={event => onChange(event.target.value)} style={{ width: "100%" }} value={filter ? filter.value : "all"}>
								<MenuItem key={`filter-account-id-any`} value={0}>{"Any"}</MenuItem>)
								{accounts.map((account, index) => <MenuItem key={index} value={account.account_id}>{account.name}</MenuItem>)}
							</Select>
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
				defaultPageSize={15}
				showPaginationTop={true}
				className="-striped -highlight"
			/>
		) */
	}
}
export default hot(module)(TransactionTable);