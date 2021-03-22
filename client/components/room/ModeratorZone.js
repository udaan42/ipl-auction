import React from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    bagLabel: {
        fontSize: 16,
        fontWeight: 400
    },
    bagValue: {
        fontSize: 16,
        fontWeight: 500
    },
    modRow:{
        marginBottom: 15,
        marginTop: 15
    }
}));

const ModeratorZone = (props) => {

    const classes = useStyles();

    return(
        <Row className={classes.modRow}>
            
                <Col> <span className={classes.bagLabel}> Current Bag - </span> <span className={classes.bagValue}> Marquee players </span> </Col>
                <Col> {(props.playersRemaining == 0)? <Button onClick={props.nextBag}> Next Bag</Button>: <Button onClick={props.submitPlayer}> Next Player</Button>} </Col>
                <Col> <span className={classes.bagLabel}> Players remaining in this bag - </span> <span className={classes.bagValue}>{props.playersRemaining} </span></Col>                
            
        </Row>
    )
}

export default ModeratorZone;