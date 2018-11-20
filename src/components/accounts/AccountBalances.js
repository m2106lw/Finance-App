import React, { Component} from "react";
import {hot} from "react-hot-loader";
const axios = require('axios');
const moment = require('moment');
// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

class AccountBalances extends Component {
	constructor(props) {
		super(props);
		this.state = {
			balances: []
		};
		this.onGridReady = this.onGridReady.bind(this);
		this.rowBalance = this.rowBalance.bind(this);
		this.rowDate = this.rowDate.bind(this);
	}
	
	componentDidMount() {
		let account_id = this.props.account_id;
		axios.get("http://localhost:8080/api/getAccountBalances?account_id=" + account_id)
			.then(response => response.data)
			.then(data => {
				this.setState({ balances: data })
			})
			.catch(error => console.log(error));
	}

	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		//params.api.sizeColumnsToFit();
	}
	
	rowBalance(row) {
		return `\$${row.data.balance}`
	}

	rowDate(row) {
		return moment(row.data.date).format("YYYY-MM-DD")
	}
	
	// Need to figure out what to show for each account - either balance and/or transactions
	// But then the above leads to should they be able to insert a transaction from this page? Will that make the other page redundent?
	// Also need to figure out how to update an account here
	render(){
		return(
			<div className="ag-theme-material" style={{height: '600px',width: '75%'}}>
				<AgGridReact
					enableSorting={true}
					enableFilter={true}
					onGridReady={this.onGridReady}
					rowSelection={"single"}
			  		columnDefs={[
						  {headerName: "Balance", field: "balance", cellRenderer: "rowBalance"},
						  {headerName: "Date", field: "date", cellRenderer: "rowDate"}
					]}
				  	rowData={this.state.balances.map((balance) => {
						return balance;
					})}
					context={{componentParent: this}}
					frameworkComponents={{
						rowBalance: this.rowBalance,
						rowDate: this.rowDate
					}}
				>
				</AgGridReact>
			</div>
		);
	}
}
export default hot(module)(AccountBalances);