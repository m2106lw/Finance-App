import React, { Component} from "react";
import {hot} from "react-hot-loader";

class GasMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: []
		}
	}
	
	componentDidMount() {
		let accounts = [{"name": "Checking1", "id": 1},{"name": "Savings", "id": 2}];
		this.setState({accounts: accounts});
		// return (
			// <ul>
				// {accounts.map((accountsData) => {
					// return (<li key={accountsData.id}>{accountsData.name}</li>)
				// })}
			// </ul>
		// )
	}
	
	render(){
		let accounts = this.state.accounts
		return(
			<ul>
				{accounts.map((accountsData) => {
					return (<li key={accountsData.id}>{accountsData.name}</li>)
				})}
			</ul>
		);
	}
}

export default hot(module)(GasMain);