import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Link } from 'react-router-dom';
// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

class AccountsMainTable extends Component {
	constructor(props) {
		super(props);
		this.onGridReady = this.onGridReady.bind(this);
		// Make sure these are not needed to be rerendered everytime
		this.rowName = this.rowName.bind(this);
		this.rowBalance = this.rowBalance.bind(this);
	}
    
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
    }

	rowName(row) {
		return <Link to={`/accounts/${row.data.account_id}`}>{row.data.name}</Link>
	}

	rowBalance(row) {
		return `\$${row.data.balance}`
	}
    
	render(){
		let accounts = this.props.accounts;

		// TODO: Need to work on the custom filtering and sorting
		// TODO: Look into default sorting by
        // TODO: Look into adding a delete button, with confirmation
		return (
			<div className="ag-theme-material" style={{height: '600px',width: '75%'}}>
				<AgGridReact
					enableSorting={true}
					enableFilter={true}
					onGridReady={this.onGridReady}
					rowSelection={"single"}
			  		columnDefs={[
                        {headerName: "Name", field: "name", cellRenderer: "rowName"},
						{headerName: "Description", field: "description"},
				  		{headerName: "Balance", field: "balance", cellRenderer: "rowBalance"},
					]}
				  	rowData={accounts.map((account, index) => {
						return account;
					})}
					//overlayLoadingTemplate={<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>}
					//overlayNoRowsTemplate={<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom 'no rows' overlay</span>}
					context={{componentParent: this}}
					frameworkComponents={{
						rowName: this.rowName,
						rowBalance: this.rowBalance,
					}}
				>
				</AgGridReact>
			</div>
		)
	}
}
export default hot(module)(AccountsMainTable);