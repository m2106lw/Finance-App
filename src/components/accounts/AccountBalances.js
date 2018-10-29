import React, { Component} from "react";
import {hot} from "react-hot-loader";
const axios = require('axios');
const moment = require('moment');

class AccountBalances extends Component {
	constructor(props) {
		super(props);
		this.state = {
			balances: []
		};
	}
	
	componentDidMount() {
		let account_id = this.props.account_id;
		axios.get("http://localhost:8080/api/getAccountBalances?account_id=" + account_id)
			.then(response => response.data)
			.then(data => {
				this.setState({ balances: data })
			})
			.catch(error => console.log(error));
	}
	
	// Need to figure out what to show for each account - either balance and/or transactions
	// But then the above leads to should they be able to insert a transaction from this page? Will that make the other page redundent?
	// Also need to figure out how to update an account here
	render(){
		let balances = this.state.balances
		return(
			<div className="accountBalances">
				<table>
					<thead>
						<tr>
							<th>Balance</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{balances.map((balancesData, index) => {
							return (
								<tr key={index}>
									<td>${balancesData.balance}</td>
									<td>{moment(balancesData.date).format('MM/DD/YYYY')}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
export default hot(module)(AccountBalances);