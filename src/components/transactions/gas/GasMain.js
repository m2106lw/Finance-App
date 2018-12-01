import React, { Component} from "react";
import {hot} from "react-hot-loader";
import moment from "moment";
// Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import {getCars} from "../../api_calls/cars";
import CarsTable from "../../cars/CarsTable";
import {getGasByYear, getGasYears} from "../../api_calls/gas_transactions";
import GasTable from "./GasTable";
import GasAdd from "./GasAdd";
import {getAccounts} from "../../api_calls/accounts";

class GasMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cars: [],
			selectedYear: (new Date()).getFullYear(),
			gasTransactions: [],
			gasYears: [],
			accounts: []
		}
		this.handleYearSelection = this.handleYearSelection.bind(this);
		this.postGasTransaction = this.postGasTransaction.bind(this);
	}
	
	async componentDidMount() {
		let cars = await getCars(this.props.user_id);
		let gasTransactions = await getGasByYear(this.props.user_id, this.state.selectedYear);
		let gasYears = await getGasYears(this.props.user_id);
		let accounts = await getAccounts(this.props.user_id);

		this.setState({cars: cars, gasTransactions: gasTransactions, gasYears: gasYears, accounts: accounts});
	}

	async handleYearSelection(year) {
		// We will need to load transactions for the selected year's data
		if (year != this.state.selectedYear) {
			let user_id = this.props.user_id;
			let gasTransactions = await getGasByYear(user_id, year);
			this.setState({selectedYear: year, gasTransactions: gasTransactions});
		}
	}

	async postGasTransaction(transaction) {
		console.log("postGas", transaction);
		console.log("total", (transaction.price * transaction.gallons));
	}
	
	render(){
		return(
			<div className="gas-grid">
				<CarsTable cars={this.state.cars}/>
				<InputLabel htmlFor="year-select">Select Year</InputLabel>
				<div className={"gas-year-select"} style={{ width: "20%" }}>
					<Select onChange={e => this.handleYearSelection(e.target.value)} value={this.state.selectedYear}>
						{this.state.gasYears.map((year, index) => <MenuItem key={index} value={year.year}>{year.year}</MenuItem>)}
					</Select>
				</div>
				<div className={"gas-new-button"}>
					<GasAdd cars={this.state.cars} accounts={this.state.accounts} postGasTransaction={this.postGasTransaction}/>
				</div>
				<div className={"gas-data-table"}>
					<GasTable gasTransactions={this.state.gasTransactions} cars={this.state.cars} accounts={this.state.accounts}/>
				</div>
			</div>
		);
	}
}

export default hot(module)(GasMain);