import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');
import Button from '@material-ui/core/Button';
import TransactionModal from './TransactionModal';

class TransactionAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			transaction: {"description": "", "amount": 0.00, "date": moment().format('YYYY-MM-DD'), transaction_type_id: 1, 'account_id': 0}
		}
		this.onModalClose = this.onModalClose.bind(this);
		this.handleModalOpen = this.handleModalOpen.bind(this);
	}

	onModalClose() {
		this.setState({modalOpen: false, transaction: {}});
	}

	handleModalOpen(event) {
		event.preventDefault();
		let transaction = this.state.transaction;
		transaction["date"] = moment().format('YYYY-MM-DD');
		this.setState({modalOpen: true, transaction: transaction});
	}
	
	render(){
		return(
			<div>
				<Button onClick={this.handleModalOpen} color="primary">Add a New transaction</Button>
				<TransactionModal 
					isOpen={this.state.modalOpen}
					transaction={this.state.transaction}
					onModalClose={this.onModalClose}
					transactionTypes={this.props.transactionTypes}
					accounts={this.props.accounts}
					postTransaction={this.props.postTransaction}
				/>
			</div>
		);
	}
}
export default hot(module)(TransactionAdd);