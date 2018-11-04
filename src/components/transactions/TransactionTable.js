import React, { Component} from "react";
import {hot} from "react-hot-loader";
const moment = require('moment');
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TransactionTable extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		let transactions = this.props.filteredTransactions;
		let transactionTypes = this.props.transactionTypes.filter((type) => {
			return type.value != -1;
		})
		let accounts = this.props.accounts.filter((account) => {
			return account.value != -1;
		})
		//<td>{moment(transaction.date).format('MM/DD/YYYY')}</td>
		//<td><input type="date" name="amount" value={moment(transaction.date).format('YYYY-MM-DD')} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "date", e.target.value)} /></td>
		return(
			<table>
				<thead>
					<tr>
						<th>Description</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Category</th>
						<th>Account</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
				{transactions.map((transaction, index) => {
					return (
						<tr key={transaction.transaction_id}>
							<td><input type="text" name="amount" value={transaction.description} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "description", e.target.value)} /></td>
							<td><input type="number" step="0.01" name="amount" value={transaction.amount} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "amount", e.target.value)} /></td>
							<td><DatePicker selected={moment(transaction.date)} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "date", e)}/></td>
							<td>
								<select className={`type_id_index_${index}`} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "transaction_type_id", e.target.value)} value={transaction.transaction_type_id}>
								{transactionTypes.map((value, index) => {
									return (
										<option key={index} value={value.value}>{value.name}</option>
									)
								})}
								</select>
							</td>
							<td>
								<select className={`account_id_index_${index}`} onChange={e => this.props.handleTransactionChange(transaction.transaction_id, "account_id", e.target.value)} value={transaction.account_id}>
								{accounts.map((value, index) => {
									return (
										<option key={index} value={value.value}>{value.name}</option>
									)
								})}
								</select>
							</td>
							<td>
								<div>
									<button onClick={e => this.props.onSave(transaction.transaction_id)}>Save</button>
									<button onClick={e => this.props.onDelete(transaction.transaction_id)}>Delete</button>
								</div>
							</td>
						</tr>
					)
				})}
				</tbody>
			</table>
		);
	}
}
export default hot(module)(TransactionTable);