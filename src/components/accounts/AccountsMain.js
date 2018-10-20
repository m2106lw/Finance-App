import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Link } from 'react-router-dom';

class AccountsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: [],
			name: "",
			description: "",
			user_id: 1
		}
		this.handleNewAccount = this.handleNewAccount.bind(this);
		this.handleAccountChange = this.handleAccountChange.bind(this);
	}
	
	componentDidMount() {
		// Break this into it's own function
		let user_id = this.state.user_id;
		fetch("http://localhost:8080/api/getAccounts?user_id=" + user_id, {
				method: "GET",
			})
			.then(response => response.json())
			.then(data => this.setState({ accounts: data }));
	}
	
	handleNewAccount(event) {
        event.preventDefault();
        let accounts = this.state.accounts;
        let name = this.state.name;
        let description = this.state.description;
		let user_id = this.state.user_id;
		
		// This is not sending data
		fetch("http://localhost:8080/api/postAccount", {
				method: "POST",
				body: {
					user_id: user_id,
					account_name: name,
					account_description: description
				},
			})
			.then(response => response.json())
			.then(data => this.setState({ }));
			
		// TEMPORARY
		fetch("http://localhost:8080/api/getAccounts?user_id=" + user_id, {
				method: "GET",
			})
			.then(response => response.json())
			.then(data => this.setState({ accounts: data }));
    }
	
	handleAccountChange(key) {
		return function (e) {
			var state = {};
			state[key] = e.target.value;
			this.setState(state);
		}.bind(this);	
	}
	
	// Look into making each link take you to the accounts main page
	// <Link to={'/accounts/accountsData.id'}>
	render(){
		let accounts = this.state.accounts
		return(
			<div className="accountsPage">
			<table>
				<tbody>
					{accounts.map((accountsData) => {
						return (
							<tr key={accountsData.account_id}>
								<td><Link to={`/accounts/${accountsData.account_id}`}>{accountsData.name}</Link></td>
								<td>{accountsData.balance}</td>
							</tr>
						)
					})}
				</tbody>
			</table>


			<form onSubmit={this.handleNewAccount}>
	            <label> Name:
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleAccountChange('name')} />
                </label>
                <label> Description: 
					<input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleAccountChange('description')} />
                </label>
					<input className="newAccountButton" type="submit" value="Submit"/>		
			</form>
			</div>
		);
	}
}
export default hot(module)(AccountsMain);