import React, {Component} from "react";
import {hot} from "react-hot-loader";
import moment from "moment";
// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
// Material UI
//import Icon from '@material-ui/core/Icon';
//import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';

import {roundMoney} from "../../functions";

class GasTable extends Component {
	constructor(props) {
		super(props);
        this.onGridReady = this.onGridReady.bind(this);
        this.rowPrice = this.rowPrice.bind(this);
        this.rowDate = this.rowDate.bind(this);
        this.rowCar = this.rowCar.bind(this);
        this.rowAccount = this.rowAccount.bind(this);
        this.rowMilage = this.rowMilage.bind(this);
        this.rowGallons = this.rowGallons.bind(this);
        this.rowTotal = this.rowTotal.bind(this);
        this.rowMPG = this.rowMPG.bind(this);
	}
	
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
    }

    // Return the price of price or N/A if we don't have data
    rowPrice(row) {
        if (row.data.price) {
            return `\$${row.data.price}`;
        }
        else {
            return "N/A";
        }
    }

    // Return the milage used or N/A if we don't have data
    rowMilage(row) {
        if (row.data.milage) {
            return `${row.data.milage}`;
        }
        else {
            return "N/A";
        }
    }
    
    // Return the gallons of gas used or N/A if we don't have data
    rowGallons(row) {
        if (row.data.gallons) {
            return `${row.data.gallons}`;
        }
        else {
            return "N/A";
        }
	}

    // Return the date formatted
	rowDate(row) {
		return moment(row.data.date).format("YYYY-MM-DD")
	}

    // Return the car name based on the car id
	rowCar(row) {
		return (
			this.props.cars.map((car) => {
				if (row.data.car_id == car.car_id) return car.car_name
			})
        )
	}

    // Return the account name based on the account id
	rowAccount(row) {
 		return (
			this.props.accounts.map((account) => {
				if (row.data.account_id == account.account_id) return account.name
			})
        )
    }
    
    // Return the total round to 2 decimal places
    rowTotal(row) {
		return `\$${roundMoney(row.data.total)}`;
    }
    
    // Return the mpg rounded to 2 decimal places
    rowMPG(row) {
		return `${roundMoney(row.data.mpg)}`;
	}
	
	render(){
		let gasTransactions = this.props.gasTransactions;

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
                        {headerName: "Date", field: "date", cellRenderer: "rowDate"},
                        {headerName: "Price", field: "price", cellRenderer: "rowPrice"},
                        {headerName: "Gallons", field: "gallons", cellRenderer: "rowGallons"},
                        {headerName: "Milage", field: "milage", cellRenderer: "rowMilage"},
                        {headerName: "Total", field: "total", cellRenderer: "rowTotal"},
                        {headerName: "MPG", field: "mpg", cellRenderer: "rowMPG"},
                        {headerName: "Car", field: "car_id", cellRenderer: "rowCar"},
                        {headerName: "Account", field: "account_id", cellRenderer: "rowAccount"},
					]}
				  	rowData={gasTransactions.map((gas) => {
						return gas;
					})}
					//overlayLoadingTemplate={<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>}
					//overlayNoRowsTemplate={<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom 'no rows' overlay</span>}
                    context={{componentParent: this}}
                    frameworkComponents={{
						//optionsButtons: this.rowModifyButtons.bind(this),
						rowDate: this.rowDate,
						rowCar: this.rowCar,
						rowAccount: this.rowAccount,
                        rowPrice: this.rowPrice,
                        rowMilage: this.rowMilage,
                        rowGallons: this.rowGallons,
                        rowTotal: this.rowTotal,
                        rowMPG: this.rowMPG
					}}
				>
				</AgGridReact>
			</div>
		)
	}

}
export default hot(module)(GasTable);