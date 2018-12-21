import React, { Component} from "react";
import {hot} from "react-hot-loader";
import moment from 'moment';
// Material UI
import Button from '@material-ui/core/Button';

import GasModal from './GasModal';

class GasAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			transaction: {
                price: 0.00,
                gallons: 0.00,
                date: moment().format('YYYY-MM-DD'),
                milage: 0,
                account_id: 0,
                car_id: 0,
                gas_id: -1
            }
		}
		this.onModalClose = this.onModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

	onModalClose() {
		this.setState({modalOpen: false});
	}

	handleModalOpen(event) {
		event.preventDefault();
		// We need to update the default date to current date, no matter when open
		// Maybe look at handling transaction defaults to TransactionModal
		let transaction = this.state.transaction;
		transaction["date"] = moment().format('YYYY-MM-DD');
		this.setState({modalOpen: true, transaction: transaction});
    }
	
	render(){
		return(
			<div>
				<Button onClick={this.handleModalOpen} variant="contained" color="primary">Add a New Gas Transaction</Button>
                <GasModal 
                    isOpen={this.state.modalOpen}
                    transaction={this.state.transaction}
                    onModalClose={this.onModalClose}
                    cars={this.props.cars}
                    accounts={this.props.accounts}
                    postGasTransaction={this.props.postGasTransaction}
                />
			</div>
		);
	}
}
export default hot(module)(GasAdd);