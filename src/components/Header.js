import React, { Component} from "react";
import { Link } from 'react-router-dom';
import {hot} from "react-hot-loader";
// Material UI
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// The Header creates links that can be used to navigate between routes.
class Header extends Component {
	constructor() {
		super();
		this.state = {
			anchorEl: null
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClick(event) {
		this.setState({anchorEl: event.currentTarget});
	}
	
	handleClose() {
		this.setState({anchorEl: null});
	}
	
	// TODO: I'd also like to add profile info at top, but that will probably be another component in App.js
	// TODO: Change the links to buttons that link to page. Change transactions to hamburger menu
	// Possible idea: hamburger menu of accounts. Not sure since that makes this require an api call
	// TODO: import AppBar from '@material-ui/core/AppBar'; - for header maybe?
	render () {
		//<td><Button component={Link} to="/transactions">Transactions</Button></td>
		let anchorEl = this.state.anchorEl;
		return (
			<header>
				<nav>
					<table>
						<tbody>
						<tr>
							<td><Button component={Link} to="/">Home</Button></td>
							<td><Button component={Link} to="/accounts">Accounts</Button></td>
							<td>
								<Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
									Transactions
								</Button>
								<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}	onClose={this.handleClose}>
          							<MenuItem component={Link} to="/transactions" onClick={this.handleClose}>All Transactions</MenuItem>
          							<MenuItem component={Link} to="/gas_transactions" onClick={this.handleClose}>Gas Transactions</MenuItem>
        						</Menu>
							</td>
							<td><Button component={Link} to="/spending_reports">Spending Report</Button></td>
						</tr>
						</tbody>
					</table>
				</nav>
			</header>
		);
	}
}
export default hot(module)(Header);