import React, { Component} from "react";
import {hot} from "react-hot-loader";
import transactionStyles from './transactions.css';
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

class TransactionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: {"description": "", "amount": 0.0, "date": '0000-00-00'}
        }
        this.handeClose = this.handleClose.bind(this);
        this.handleTransactionChange = this.handleTransactionChange.bind(this);
        this.handleClose = this.handeClose.bind(this);
        this.handleCloseSave = this.handleCloseSave.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.transaction) !== JSON.stringify(prevState.transaction)) {
            this.setState({transaction: this.props.transaction});
        }
    }

    // This will not save the data
    handleClose(event, reason) {
        event.preventDefault()
        console.log(event);
        console.log(reason);
        this.props.onModalClose();
        this.setState({transaction: {"description": "", "amount": 0.0, "date": '0000-00-00'}});
    }

    // This will eventually pass the new transaction up
    handleCloseSave() {
        console.log("Transaction that will be saved: ", this.state.transaction);
    }

    handleTransactionChange(key, value) {
        console.log(key, value);
 		let transaction = this.state.transaction;
        transaction[key] = value;
        this.setState({transaction: transaction});
	}

    // This will not render correctly, transparent and in the background
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
                        Edit the data for the field
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        type="text"
                        value={this.state.transaction.description}
                        fullWidth
                        onChange={e => this.handleTransactionChange("description", e.target.value)}
                    />
                    <TextField
                        label="Amount"
                        id="adornment-amount"
                        value={this.state.transaction.amount}
                        onChange={e => this.handleTransactionChange("amount", e.target.value)}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                        autoFocus
                        margin="dense"
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker 
                            label="Date"
                            value={this.state.transaction.date}
                            showTodayButton
                            onChange={e => this.handleTransactionChange("date", e._d)}
                        />
                    </MuiPickersUtilsProvider>
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