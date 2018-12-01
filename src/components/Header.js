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
			anchorEl: null,
			anchorEl2: null
		}
		this.handleCloseTransactions = this.handleCloseTransactions.bind(this);
		this.handleCloseLists = this.handleCloseLists.bind(this);
	}

	handleCloseTransactions() {
		this.setState({anchorEl: null});
	}

	handleCloseLists() {
		this.setState({anchorEl2: null});
	}
	
	// TODO: I'd also like to add profile info at top, but that will probably be another component in App.js
	// TODO: Change the links to buttons that link to page. Change transactions to hamburger menu
	// Possible idea: hamburger menu of accounts. Not sure since that makes this require an api call
	// TODO: import AppBar from '@material-ui/core/AppBar'; - for header maybe?
	render () {
		let anchorEl = this.state.anchorEl;
		let anchorEl2 = this.state.anchorEl2;
		return (
			<header>
				<nav>
					<table>
						<tbody>
						<tr>
							<td><Button component={Link} to="/">Home</Button></td>
							<td><Button component={Link} to="/accounts">Accounts</Button></td>
							<td>
								<Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={event => this.setState({anchorEl: event.currentTarget})}>
									Transactions
								</Button>
								<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}	onClose={this.handleCloseTransactions}>
          							<MenuItem component={Link} to="/transactions" onClick={this.handleCloseTransactions}>All Transactions</MenuItem>
          							<MenuItem component={Link} to="/transactions/gas" onClick={this.handleCloseTransactions}>Gas Transactions</MenuItem>
        						</Menu>
							</td>
							<td>
								<Button aria-owns={anchorEl2 ? 'simple-menu2' : undefined} aria-haspopup="true" onClick={event => this.setState({anchorEl2: event.currentTarget})}>
									Lists
								</Button>
								<Menu id="simple-menu2" anchorEl={anchorEl2} open={Boolean(anchorEl2)}	onClose={this.handleCloseLists}>
          							<MenuItem component={Link} to="/lists" onClick={this.handleCloseLists}>Lists</MenuItem>
          							<MenuItem component={Link} to="/lists/cars" onClick={this.handleCloseLists}>Cars</MenuItem>
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