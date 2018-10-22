import React, { Component } from "react";
import {hot} from "react-hot-loader";

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
  
	handleLogin(event) {
		event.preventDefault();
		if (this.state.email != "" && this.state.password != "") {
			this.props.onAuthSucceed("token");
		}
		else {
			this.setState({error: true});
		}
	}
  
	handleLoginTextChange(key) {
		return function (e) {
			var state = {};
			state[key] = e.target.value;
			this.setState(state);
		}.bind(this);	
	}
	
	render() {
		return (
			<div>
			<form onSubmit={this.handleLogin}>
	            <label> Name:
                    <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleLoginTextChange('email')} />
                </label>
                <label> Password: 
					<input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.handleLoginTextChange('password')} />
                </label>
					<input className="loginButton" type="submit" value="Login"/>		
			</form>
			</div>					
		);
	}
	
}
export default hot(module)(Login);