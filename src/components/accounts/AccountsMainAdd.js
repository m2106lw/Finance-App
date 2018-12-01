import React, { Component} from "react";
import {hot} from "react-hot-loader";
// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// TODO: Check if we can make this a purecomponent, not sure if worth it
class AccountsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {name: "", description: ""}
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    handleValueChange(key, value) {
        let account = this.state.account;
        account[key] = value;
        this.setState({account: account});
    }

    onSave(event) {
        event.preventDefault();
        this.props.addNewAccount(this.state.account);
        this.onClear(event);
    }

    onClear(event) {
        event.preventDefault();
        let account = {name: "", description: ""};
        this.setState({account: account});
    }

	render(){
		return(
			<div className="accountAdd"> 
                <h3>Create a new Account</h3>              
                <TextField
                        margin="dense"
                        id="name"
                        label="Account Name"
                        type="text"
                        value={this.state.account.name}
                        onChange={e => this.handleValueChange("name", e.target.value)}
                />
                {"    "}
                <TextField
                        margin="dense"
                        id="description"
                        label="Account Description"
                        type="text"
                        value={this.state.account.description}
                        onChange={e => this.handleValueChange("description", e.target.value)}
                />
                <Button onClick={this.onSave} color="primary">Save</Button>
                <Button onClick={this.onClear} color="primary">Clear</Button>
			</div>
		);
	}

}
export default hot(module)(AccountsMain);