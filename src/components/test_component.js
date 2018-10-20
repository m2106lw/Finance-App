import React, { Component} from "react";
import {hot} from "react-hot-loader";

class Test_component extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		return(
			<p> Hello, my name is {this.props.name} </p>
		);
	}
}

export default hot(module)(Test_component);