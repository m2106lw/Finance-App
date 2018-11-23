import React, { Component} from "react";
import {hot} from "react-hot-loader";
import moment from 'moment';
// Material UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
// Change this to the dialog box since Modal is not cooperating
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { capitalizeFirstLetter } from '../functions';

class TransactionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: {}
        }
        this.handeClose = this.handleClose.bind(this);
        this.handleTransactionChange = this.handleTransactionChange.bind(this);
        this.handleClose = this.handeClose.bind(this);
        this.handleCloseSave = this.handleCloseSave.bind(this);
    }

    // Figure out if this is correct
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.transaction) !== JSON.stringify(prevState.transaction)) {
            this.setState({transaction: this.props.transaction});
        }
    }

    // This will not save the data
    handleClose(event, reason) {
        event.preventDefault()
        this.props.onModalClose();
        this.setState({transaction: {}});
    }

    // This will pass the data needed to the main page component
    handleCloseSave() {
        this.props.postTransaction(this.state.transaction);
        this.props.onModalClose();
        this.setState({transaction: {}});
    }

    // Update the transaction key on a change
    handleTransactionChange(key, value) {
 		let transaction = this.state.transaction;
        transaction[key] = value;
        this.setState({transaction: transaction});
	}

    // TODO: Figure out how to handle disabling buttons and stopping saving when data is incorrect
    // TODO: Change will-change: auto for dialog style to avoid firefox warning
    render() {
        if (this.props.isOpen === false)
            return null

        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit Table Row</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the data for the transaction
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Description"
                        type="text"
                        value={this.state.transaction.description || ""}
                        fullWidth
                        onChange={e => this.handleTransactionChange("description", e.target.value)}
                    />
                    <TextField
                        label="Amount"
                        id="adornment-amount"
                        value={this.state.transaction.amount || 0.00}
                        onChange={e => this.handleTransactionChange("amount", e.target.value)}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                        margin="dense"
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker 
                            label="Date"
                            value={this.state.transaction.date || moment().format("YYYY-MM-DD")}
                            showTodayButton
                            onChange={e => this.handleTransactionChange("date", moment(e._d).format("YYYY-MM-DD"))}
                        />
                    </MuiPickersUtilsProvider>
                    <br></br>
                    <FormControl>
                        <InputLabel htmlFor="edit-transaction-type">Type</InputLabel>
                        <Select onChange={e => this.handleTransactionChange("transaction_type_id", e.target.value)} value={this.state.transaction.transaction_type_id || 1}>
						    {this.props.transactionTypes.map((type) => <MenuItem key={`type-${type.name}`} value={type.transaction_type_id}>{capitalizeFirstLetter(type.name)}</MenuItem>)}
					    </Select>
                    </FormControl>
                    <br></br>
                    <FormControl>
                        <InputLabel htmlFor="edit-account">Account</InputLabel>
                        <Select onChange={e => this.handleTransactionChange("account_id", e.target.value)} value={this.state.transaction.account_id || 0}>
						    {this.props.accounts.map((account) => <MenuItem key={`account-${account.name}`} value={account.account_id}>{account.name}</MenuItem>)}
					    </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleCloseSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default hot(module)(TransactionModal);