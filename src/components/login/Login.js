import React, { Component } from "react";
import {hot} from "react-hot-loader";

import {user_login} from "../api_calls/credentials";

// Need to handle
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: false
		}
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLoginTextChange = this.handleLoginTextChange.bind(this);
	}
  
	async handleLogin (event) {
		event.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		try {
			let token = await user_login(email, password);
			console.log(token);
			this.props.onAuthSucceed(token);
		}
		catch (err) {
			console.log(err);
			this.setState({error: true});
		}
	}
  
	handleLoginTextChange (key, event) {
		let value = event.target.value;
		this.setState({[key]: value});
/* 		return function (e) {
			var state = {};
			state[key] = e.target.value;
			this.setState(state);
		}.bind(this); */	
	}
	
	render() {
		return (
			<div>
				<form onSubmit={this.handleLogin}>
	            	<label> Name:
	                    <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={e => this.handleLoginTextChange('email', e)} />
    	            </label>
        	        <label> Password: 
						<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleLoginTextChange('password', e)} />
                	</label>
						<input className="loginButton" type="submit" value="Login"/>		
				</form>
			</div>					
		);
	}
	
}
export default hot(module)(Login);