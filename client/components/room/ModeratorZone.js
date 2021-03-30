import React from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { API_ENDPOINT, USER_ID, JWT_TOKEN, BAG } from '../../config/config';
import { getLocalStorage, setLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    bagLabel: {
        fontSize: 14,
        fontWeight: 400
    },
    bagValue: {
        fontSize: 15,
        fontWeight: 500
    },
    modRow:{
        marginBottom: 15,
        marginTop: 15
    },
    endButton: {
        fontSize: 15,
        float: "right",
        marginRight: 15
    },
    nextBtn: {
        fontSize: 15
    }
}));

const ModeratorZone = (props) => {

    const [open, setOpen] = React.useState(false);
    const leagueId = props.leagueId;

    const endButtonClicked = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    const agreeEndAuction = () => {

        const bearer_token = getLocalStorage(JWT_TOKEN);
        const bearer = 'Bearer ' + bearer_token;
        const url = `${API_ENDPOINT}/iplauction/league/updateLeagueStatus/${leagueId}/ENDED`;

        const headers = {
            'Authorization': bearer
        }
        // POST CALL
        axios.put(url, {}, {
            headers: headers
        })
        .then((response) => {
            
            console.log(response);
            setOpen(false);
            props.onEndAuction();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return(
        <Row className={classes.modRow}>
            
                <Col md={3}> 
                    <div className={classes.bagLabel}> <span>Current Bag - </span><span className={classes.bagValue}> {props.currentBag} </span> </div> 
                    <div className={classes.bagLabel}> <span> Players remaining in this bag - </span> <span className={classes.bagValue}>{props.playersRemaining}</span> </div>
                </Col>
                <Col md={2}> {(props.playersRemaining == 0)? <Button className={classes.nextBtn} disabled={!props.sold} onClick={props.nextBag}> Next Bag</Button>: <Button className={classes.nextBtn} disabled={!props.sold} onClick={props.submitPlayer}> Next Player</Button>} </Col>
                <Col></Col>              
                <Col md={2}>
                    <Button className={classes.endButton} onClick={endButtonClicked} variant="warning"> End Auction</Button>
                </Col>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Are you sure want to end the auction?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Once you end the auction, you wont be able to enter the auction room for this league again. Are you sure ?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} variant="secondary">
                        Disagree
                    </Button>
                    <Button onClick={agreeEndAuction} variant="danger">
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
        </Row>
    )
}

export default ModeratorZone;