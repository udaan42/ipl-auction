import React from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';


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

    const classes = useStyles();

    return(
        <Row className={classes.modRow}>
            
                <Col md={3}> 
                    <div className={classes.bagLabel}> <span>Current Bag - </span><span className={classes.bagValue}> Marquee players </span> </div> 
                    <div className={classes.bagLabel}> <span> Players remaining in this bag - </span> <span className={classes.bagValue}>{props.playersRemaining}</span> </div>
                </Col>
                <Col md={2}> {(props.playersRemaining == 0)? <Button className={classes.nextBtn} disabled={!props.sold} onClick={props.nextBag}> Next Bag</Button>: <Button className={classes.nextBtn} disabled={!props.sold} onClick={props.submitPlayer}> Next Player</Button>} </Col>
                <Col></Col>              
                <Col md={2}>
                    <Button className={classes.endButton} variant="warning"> End Auction</Button>
                </Col>
        </Row>
    )
}

export default ModeratorZone;