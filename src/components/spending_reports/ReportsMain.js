import React, {Component} from "react";
import {hot} from "react-hot-loader";
import moment from 'moment';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class ReportsMain extends Component {
    constructor(props) {
		super(props);
		this.state = {
			value: 0
		}
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange = (event, value) => {
		this.setState({value: value});
	};
    
	render(){
		console.log(this.props.user_id);
		return(
			<div>
				<AppBar position="static">
			  		<Tabs value={value} onChange={this.handleChange}>
						<Tab label="Item One" />
						<Tab label="Item Two" />
						<Tab label="Item Three" />
			  		</Tabs>
				</AppBar>
				{value === 0 && <TabContainer>Item One</TabContainer>}
				{value === 1 && <TabContainer>Item Two</TabContainer>}
				{value === 2 && <TabContainer>Item Three</TabContainer>}
		  </div>
		);
	}
}
export default hot(module)(ReportsMain);