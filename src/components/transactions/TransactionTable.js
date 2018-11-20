import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');
// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
// Material UI
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import TransactionModal from './TransactionModal';
import { capitalizeFirstLetter } from '../functions';
//import { months } from '../templates';

class TransactionTable extends Component {
	constructor(props) {
		super(props);
		this.state ={
			modalOpen: false,
			transaction: {}
		}
		this.onGridReady = this.onGridReady.bind(this);
		// Make sure these are not needed to be rerendered everytime
		this.rowDate = this.rowDate.bind(this);
		this.rowType = this.rowType.bind(this);
		this.rowAccount = this.rowAccount.bind(this);
		this.onModalClose = this.onModalClose.bind(this);
		this.rowAmount = this.rowAmount.bind(this);
	}

	onModalClose() {
		this.setState({modalOpen: false, transaction: {}});
	}
	
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
	}

	rowAmount(row) {
		return `\$${row.data.amount}`
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
		//<Button key={"edit-row"} onClick={e => this.setState({transaction: row.data, modalOpen: true})} color="primary">Edit</Button>
		return (
			<div>
				<IconButton key={"edit"} color="primary" variant="contained" onClick={e => this.setState({transaction: row.data, modalOpen: true})}>
					<Icon>edit</Icon>
				</IconButton>	
				<IconButton key={"delete-row"} variant="contained" color="secondary" onClick={e => this.props.deleteTransaction(row.data.transaction_id)}>
        			<DeleteIcon/>
      			</IconButton>
			</div>
		)
	}
	
	render(){
		let transactions = this.props.transactions;

		// TODO: Find a better way to handle this
		if (this.props.transactionTypes.length == 0) return <p>Loading...</p>
		if (this.props.accounts.length == 0) return <p>Loading...</p>

		// TODO: Need to work on the custom filtering and sorting
		// TODO: Look into default sorting by
		return (
			<div className="ag-theme-material" style={{height: '600px',width: '75%'}}>
				<AgGridReact
					enableSorting={true}
					enableFilter={true}
					onGridReady={this.onGridReady}
					rowSelection={"single"}
			  		columnDefs={[
						{headerName: "Description", field: "description"},
				  		{headerName: "Amount", field: "amount", cellRenderer: "rowAmount"},
						{headerName: "Date", field: "date", cellRenderer: "rowDate"},
						{headerName: "Type", field: "transaction_type_id", cellRenderer: "rowType"},
						{headerName: "Account", field: "account_id", cellRenderer: "rowAccount"},
						{headerName: "Options", "field": "row", cellRenderer: "optionsButtons"}
					]}
				  	rowData={transactions.map((transaction, index) => {
						return transaction;
					})}
					//overlayLoadingTemplate={<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>}
					//overlayNoRowsTemplate={<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom 'no rows' overlay</span>}
					context={{componentParent: this}}
					frameworkComponents={{
						optionsButtons: this.rowModifyButtons.bind(this),
						rowDate: this.rowDate,
						rowType: this.rowType,
						rowAccount: this.rowAccount,
						rowAmount: this.rowAmount
					}}
				>
				</AgGridReact>
				<TransactionModal isOpen={this.state.modalOpen} transaction={this.state.transaction} onModalClose={this.onModalClose} transactionTypes={this.props.transactionTypes} accounts={this.props.accounts} postTransaction={this.props.postTransaction}/>
			</div>
		)
	}
}
export default hot(module)(TransactionTable);