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

class GasModal extends Component {
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
    // TODO: Check transactions - This may not be loading right - Its not
    // TODO: Figure out how to handle a new transaction
    componentDidUpdate(prevProps) {
        // We make deep copies of the data we want
        if (JSON.stringify(this.props.transaction) !== JSON.stringify(prevProps.transaction)) {
            let gas_id = this.props.transaction.gas_id;
            let milage = this.props.transaction.milage;
            let price = this.props.transaction.price;
            let date = this.props.transaction.date;
            let car_id = this.props.transaction.car_id;
            let account_id = this.props.transaction.account_id;
            let gallons = this.props.transaction.gallons;

            console.log("gas_id", gas_id)

            let transaction = {
                gas_id: gas_id,
                milage: milage,
                price: price,
                date: date,
                car_id: car_id,
                account_id: account_id,
                gallons: gallons
            }
            this.setState({transaction: transaction});
        }
    }

    // This will save all data that has been changed, but not saved in the table.
    handleClose(event, reason) {
        event.preventDefault()
        this.props.onModalClose();
        this.setState({transaction: {}});
    }

    // This will pass the data needed to the main page component
    handleCloseSave() {
        this.props.postGasTransaction(this.state.transaction);
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

        console.log("modal transaction", this.state.transaction);

        return (
            <Dialog open={this.props.isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Table Row</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the data for the transaction
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker 
                            label="Date"
                            value={this.state.transaction.date || moment().format("YYYY-MM-DD")}
                            showTodayButton
                            onChange={e => this.handleTransactionChange("date", moment(e._d).format("YYYY-MM-DD"))}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        label="Price"
                        id="adornment-price"
                        value={this.state.transaction.price || 0.00}
                        onChange={e => this.handleTransactionChange("price", e.target.value)}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Milage"
                        id="adornment-milage"
                        value={this.state.transaction.milage || 0}
                        onChange={e => this.handleTransactionChange("milage", e.target.value)}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Gallons"
                        id="adornment-gallons"
                        value={this.state.transaction.milage || 0}
                        onChange={e => this.handleTransactionChange("gallons", e.target.value)}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                        margin="dense"
                    />
                    <br></br>
                    <FormControl>
                        <InputLabel htmlFor="edit-car">Car</InputLabel>
                        <Select onChange={e => this.handleTransactionChange("car_id", e.target.value)} value={this.state.transaction.car_id || 0}>
						    {this.props.cars.map((car) => <MenuItem key={`type-${car.name}`} value={car.car_id}>{car.name}</MenuItem>)}
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
export default hot(module)(GasModal);