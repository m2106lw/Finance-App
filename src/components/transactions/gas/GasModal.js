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
            gas_id: -1,
            milage:0,
            price: 0.00,
            date: moment().format("YYYY-MM-DD"),
            car_id: 0,
            account_id: 0,
            gallons: 0
        }
        this.handeClose = this.handleClose.bind(this);
        this.handleTransactionChange = this.handleTransactionChange.bind(this);
        this.handleClose = this.handeClose.bind(this);
        this.handleCloseSave = this.handleCloseSave.bind(this);
        this.emptyModal = this.emptyModal.bind(this);
    }

    componentDidUpdate(prevProps) {
        // We check the gas id to see if we have a new gas transaction coming into the modal
        if (prevProps.transaction.gas_id !== this.props.transaction.gas_id) {
             // Now take the object that we recieved and break it into seperate parts to be editable
             // This is done to a weird bug where something had to always remain in the value field with my previous implementation
             this.setState({
                gas_id: this.props.transaction.gas_id,
                milage: this.props.transaction.milage,
                price: this.props.transaction.price,
                date:this.props.transaction.date,
                car_id:this.props.transaction.car_id,
                account_id: this.props.transaction.account_id,
                gallons: this.props.transaction.gallons
            })
        }
    }

    // This will empty the data - I think - so that we have a blank slate when open the modal
    emptyModal() {
        this.setState({
            gas_id: -1,
            milage:0,
            price: 0.00,
            date: moment().format("YYYY-MM-DD"),
            car_id: 0,
            account_id: 0,
            gallons: 0
        });
    }

    // This will save all data that has been changed, but not saved in the table.
    handleClose(event, reason) {
        event.preventDefault()
        this.emptyModal();
        this.props.onModalClose();
    }

    // This will pass the data needed to the main page component
    handleCloseSave() {
        let transaction = {
            gas_id: this.state.gas_id,
            milage: this.state.milage,
            price: this.state.price,
            date:this.state.date,
            car_id:this.state.car_id,
            account_id: this.state.account_id,
            gallons: this.state.gallons
        };
        this.props.postGasTransaction(transaction);
        this.emptyModal();
        this.props.onModalClose();
    }

    // Update the transaction key on a change
    handleTransactionChange(key, value) {
        this.setState({[key]: value});
	}

    // TODO: Figure out how to handle disabling buttons and stopping saving when data is incorrect
    // TODO: Change will-change: auto for dialog style to avoid firefox warning
    render() {
        if (this.props.isOpen === false)
            return null

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
                            value={this.state.date}
                            showTodayButton
                            onChange={e => this.handleTransactionChange("date", moment(e._d).format("YYYY-MM-DD"))}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        label="Price"
                        id="adornment-price"
                        value={this.state.price}
                        onChange={e => this.handleTransactionChange("price", e.target.value)}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Milage"
                        id="adornment-milage"
                        value={this.state.milage}
                        onChange={e => this.handleTransactionChange("milage", e.target.value)}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Gallons"
                        id="adornment-gallons"
                        value={this.state.gallons}
                        onChange={e => this.handleTransactionChange("gallons", e.target.value)}
                        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                        fullWidth
                        margin="dense"
                    />
                    <br></br>
                    <FormControl>
                        <InputLabel htmlFor="edit-car">Car</InputLabel>
                        <Select onChange={e => this.handleTransactionChange("car_id", e.target.value)} value={this.state.car_id}>
						    {this.props.cars.map((car) => <MenuItem key={`type-${car.name}`} value={car.car_id}>{car.name}</MenuItem>)}
					    </Select>
                    </FormControl>
                    <br></br>
                    <FormControl>
                        <InputLabel htmlFor="edit-account">Account</InputLabel>
                        <Select onChange={e => this.handleTransactionChange("account_id", e.target.value)} value={this.state.account_id}>
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