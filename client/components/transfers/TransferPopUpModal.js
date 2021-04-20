import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
const classNames = require('classnames');
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {Button} from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
    price: {
        marginTop: 20,
        display: "inline-block",
        marginLeft: 10
    }
}));

export default function TransferPopUpModal (props) {
    const classes = useStyles();
    const [bid, setBid] = useState(0); 

    const handleErrorClose = () => {
        props.submitBid(bid);
        props.closeModal();
    }
    let min = 30;
    if(props.player){
        min = props.player.basePrice
    }

    const handleChange = (e) => {
        setBid(e.target.value);
    }

    return(
        <Dialog
            open={props.show}
            keepMounted
            onClose={handleErrorClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title"> Submit Transfer Request</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <TextField
                        id="standard-number"
                        label="Bid amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            inputProps: {
                            max: props.balance,
                            min: min,
                            step: 5
                            }
                        }}
                        onChange={handleChange}
                    /> 
                    <span className={classes.price}> Lakhs</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleErrorClose} variant="danger">
                Okay
            </Button>
            </DialogActions>
        </Dialog>
    )
}