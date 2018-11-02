import React, { Component} from "react";
import {hot} from "react-hot-loader";

class GenericSelect extends Component {
	constructor(props) {
		super(props);
		this.handleOptionSelection = this.handleOptionSelection.bind(this);
	}
	
	handleOptionSelection(e) {
		this.props.passSelection(e.target.value);
	}

	render(){
		let selectArray = this.props.selectArray;
		let defaultValue = this.props.defaultValue;
		return(
			<select className={this.props.className} onChange={this.handleOptionSelection} value={defaultValue}>
				{selectArray.map((value, index) => {
					return (
						<option key={index} value={value.value}>{value.name}</option>
					)
				})}
			</select>
		);
	}
}
export default hot(module)(GenericSelect);