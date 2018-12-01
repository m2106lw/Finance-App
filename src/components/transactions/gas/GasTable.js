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
	}
	
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		params.api.sizeColumnsToFit();
    }
    
    rowPrice(row) {
        if (row.data.price) {
            return `\$${row.data.price}`;
        }
        else {
            return "N/A";
        }
    }
    
    rowMilage(row) {
        if (row.data.milage) {
            return `${row.data.milage}`;
        }
        else {
            return "N/A";
        }
    }
    
    rowGallons(row) {
        if (row.data.gallons) {
            return `${row.data.gallons}`;
        }
        else {
            return "N/A";
        }
	}

	rowDate(row) {
		return moment(row.data.date).format("YYYY-MM-DD")
	}

	rowCar(row) {
		return (
			this.props.cars.map((car) => {
				if (row.data.car_id == car.car_id) return car.car_name
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
                        {headerName: "Total", field: "total"},
                        {headerName: "MPG", field: "mpg"},
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
                        rowGallons: this.rowGallons
					}}
				>
				</AgGridReact>
			</div>
		)
	}

}
export default hot(module)(GasTable);