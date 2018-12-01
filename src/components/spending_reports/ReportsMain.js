import React, {Component} from "react";
import {hot} from "react-hot-loader";
import moment from 'moment';
// Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// Finance
import {months} from "../templates";

class ReportsMain extends Component {
    constructor(props) {
		super(props);
		this.state = {
			value: -1
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	};
	
	render(){
		return(
			<div>
				<Select onChange={this.handleChange} value={this.state.value || -1}>
				    {months.map((month) => <MenuItem key={month.value} value={month.value}>{month.name}</MenuItem>)}
				</Select>
				<p>{this.state.value}</p>
		  </div>
		);
	}
}
export default hot(module)(ReportsMain);