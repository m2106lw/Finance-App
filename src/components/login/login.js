import React, { Component } from "react";
//import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import "./Login.css";

// Need to handle
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};
	}
	
	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}
	
	handleClick(event){
		console.log(this.state.username);
	}
	
	render() {
		return (
			<div>
				<TextField 
					hintText="Enter your Username" floatingLabelText="Username"
					onChange = {(event, newValue) =>
						this.setState({username: newValue})}
				/>
				<br/>
				<TextField 
					hintText="Enter your Password" floatingLabelText="Password"
					onChange = {(event, newValue) =>
					this.setState({username: newValue})}
				/>
				<br/>
				<button label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
			</div>					
		);
	}
	
}
export default hot(module)(Login);