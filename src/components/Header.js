import React, { Component} from "react";
import { Link } from 'react-router-dom';
import {hot} from "react-hot-loader";

// The Header creates links that can be used to navigate between routes.
class Header extends Component {
	constructor() {
		super();
	}
	
	// TODO: I'd also like to add profile info at top, but that will probably be another component in App.js
	// TODO: Change the links to buttons that link to page. Change transactions to hamburger menu
	// Possible idea: hamburger menu of accounts. Not sure since that makes this require an api call
	// TODO: Spending report will contain graphs of your spending for each year, month, and account. This will include averages and stuff like that
	render () {
		return (
			<header>
				<nav>
					<table>
						<tbody>
						<tr>
							<td><Link to='/'>Home</Link></td>
							<td><Link to='/accounts'>Accounts</Link></td>
							<td><Link to='/transactions'>Transactions</Link></td>
							<td><Link to='/spending_report'>Spending Report</Link></td>
						</tr>
						</tbody>
					</table>
				</nav>
			</header>
		);
	}
}
export default hot(module)(Header);