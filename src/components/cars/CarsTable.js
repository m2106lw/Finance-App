import React, {Component} from "react";
import {hot} from "react-hot-loader";
// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
// Material UI
//import Icon from '@material-ui/core/Icon';
//import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';

class CarsTable extends Component {
	constructor(props) {
		super(props);
		this.onGridReady = this.onGridReady.bind(this);
	}
	
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		//params.api.sizeColumnsToFit();
	}
	
	render(){
		let cars = this.props.cars;

		// TODO: Need to work on the custom filtering and sorting
		// TODO: Look into default sorting by
		return (
			<div className="ag-theme-material" style={{height: '200px',width: '20%'}}>
				<AgGridReact
					enableSorting={true}
					enableFilter={true}
					onGridReady={this.onGridReady}
					rowSelection={"single"}
			  		columnDefs={[
						{headerName: "Car Name", field: "car_name"},
					]}
				  	rowData={cars.map((car) => {
						return car;
					})}
					//overlayLoadingTemplate={<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>}
					//overlayNoRowsTemplate={<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">This is a custom 'no rows' overlay</span>}
					context={{componentParent: this}}
				>
				</AgGridReact>
			</div>
		)
	}

}
export default hot(module)(CarsTable);