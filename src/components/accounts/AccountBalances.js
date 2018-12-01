import React, { Component} from "react";
import {hot} from "react-hot-loader";
import moment from 'moment';
// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import {getAccountBalances} from '../api_calls/balances'

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
	
	async componentDidMount() {
		let account_id = this.props.account_id;
		let balances = await getAccountBalances(account_id);
		this.setState({balances: balances});
	}

	// Maybe add a refresh option?

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