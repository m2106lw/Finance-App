import React, { Component} from "react";
import {hot} from "react-hot-loader";

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	componentDidMount() {
		let account_id = this.props.match.params.id;
		this.setState({account_id: account_id});
	}
	
	render(){
		console.log(this.state.account_id);
		return(
			<div className="accountsPage">
				<p>Welcome to page for account {this.state.account_id}</p>
			</div>
		);
	}
}
export default hot(module)(Account);