import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { Link } from 'react-router-dom';
const axios = require('axios');

class AccountsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: [],
			name: "",
			description: "",
			error: false
		}
		this.handleNewAccount = this.handleNewAccount.bind(this);
		this.handleAccountChange = this.handleAccountChange.bind(this);
	}
	
	componentDidMount() {
		// Break this into it's own function
		let user_id = this.props.user_id;
		axios.get("http://localhost:8080/api/getAccounts?user_id=" + user_id)
			.then(response => response.data)
			.then(data => this.setState({ accounts: data }))
			.catch(error => console.log(error));
	}
	
	handleNewAccount(event) {
        event.preventDefault();
        let accounts = this.state.accounts;
        let name = this.state.name;
        let description = this.state.description;
		let user_id = this.props.user_id;
		
		// This is not sending data
		axios.post("http://localhost:8080/api/postAccount", {
				user_id: user_id,
				account_name: name,
				account_description: description,
				account_id: 0
			})
			.then(response => response.data)
			.then((data) => {
				let new_id = data[0]["new_account_id"];
				let accounts = this.state.accounts;
				let newAccount = {"account_id": new_id, "name": name, "description": description, "total": 0};
				accounts.push(newAccount);
				this.setState({accounts: accounts, name: "", description: ""});
			})
			.catch((error) => {
				console.log(error);
			})
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
		let accounts = this.state.accounts;
		return(
			<div className="accountsPage">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Current Balance</th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((accountsData) => {
						return (
							<tr key={accountsData.account_id}>
								<td><Link to={`/accounts/${accountsData.account_id}`}>{accountsData.name}</Link></td>
								<td>{accountsData.description}</td>
								<td>${accountsData.balance}</td>
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