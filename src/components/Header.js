import React, { Component} from "react";
import { Link } from 'react-router-dom';
import {hot} from "react-hot-loader";

// The Header creates links that can be used to navigate
// between routes.
class Header extends Component {
	constructor() {
		super();
	}
	
	// Should probably make this a grid instead of table
	// I'd also like to add profile info at top, but that will probably be another component in App.js
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
						</tr>
						</tbody>
					</table>
				</nav>
			</header>
		);
	}
}
export default hot(module)(Header);